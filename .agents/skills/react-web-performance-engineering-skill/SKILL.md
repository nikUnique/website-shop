---
name: react-web-performance-engineering-skill
description: Guides an AI agent to write high-performance React web code — enforcing compositor-only animations, preventing unnecessary re-renders, optimizing drag & drop with Pointer Events, virtualizing large lists, and keeping the main thread unblocked.
---

# react-web-performance-engineering-skill

You are an expert React web performance engineer. Every decision optimizes for smooth 60fps UI, minimal re-renders, non-blocking main thread execution, and fast initial load — targeting both desktop and mobile browsers.

## Usage

Use this skill whenever you are:
- Writing or reviewing React components that animate, drag, or render lists
- Debugging jank, layout thrash, or slow renders
- Choosing between animation libraries, list strategies, or state update patterns
- Auditing a component before shipping (run the checklist at the end)

## Steps

1. **Identify the performance domain** — animation, re-renders, drag & drop, main thread, lists, images, or bundle size — then jump to the relevant section below.
2. **Apply the correct tool and pattern** for that domain using the reference sections.
3. **Verify your solution against the Decision Tree** to confirm the right trade-off was made.
4. **Run the shipping checklist** before finalising any component.

---

## Reference

### 1. Animations — CSS & Transform/Opacity ONLY

**Never animate layout-triggering properties.** Layout properties (width, height, top, left, margin, padding) force the browser to recalculate the entire document layout on every frame.

❌ BAD — triggers layout + paint on every frame:
```css
.box { transition: width 300ms, height 300ms, top 300ms; }
```

✅ GOOD — compositor-only, runs off main thread:
```css
.box { transition: transform 300ms ease, opacity 300ms ease; }
.box.visible { transform: translateY(0); opacity: 1; }
.box.hidden  { transform: translateY(20px); opacity: 0; }
```

**Use `will-change` sparingly — only for elements actively animating:**
```css
.animating { will-change: transform; } /* ✅ apply before, remove after */
* { will-change: transform; }          /* ❌ wastes GPU memory */
```

**For JS-driven animations, use `framer-motion`:**
```jsx
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<AnimatePresence>
  {isVisible && (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.2, ease: 'easeOut' }}
    />
  )}
</AnimatePresence>
```

**For scroll-linked or gesture animations, use the Web Animations API directly:**
```js
element.animate(
  [{ transform: 'translateX(0px)' }, { transform: 'translateX(100px)' }],
  { duration: 300, easing: 'ease-out', fill: 'forwards' }
);
```

---

### 2. Preventing Unnecessary Re-renders

```jsx
// ✅ Memoize pure display components
const Card = React.memo(({ title, onPress }) => (
  <button onClick={onPress}>{title}</button>
));

// ✅ Stabilize callbacks
const handleClick = useCallback((id) => {
  dispatch({ type: 'SELECT', id });
}, [dispatch]);

// ✅ Memoize expensive derivations
const sorted = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);
```

**Web-specific trap — context overconsumption:**
```jsx
// ❌ Every consumer re-renders when ANY context value changes
const AppContext = createContext({ user, theme, settings, cart });

// ✅ Split context by update frequency
const UserContext  = createContext(user);    // rarely changes
const ThemeContext = createContext(theme);   // rarely changes
const CartContext  = createContext(cart);    // changes often
```

**Use `useDeferredValue` to keep UI responsive during heavy renders:**
```jsx
const deferredQuery = useDeferredValue(searchQuery);
const results = useMemo(() => filterItems(deferredQuery), [deferredQuery]);
```

**Use `startTransition` for non-urgent state updates:**
```jsx
import { startTransition } from 'react';

startTransition(() => {
  setSearchResults(computeHeavyFilter(query));
});
```

---

### 3. Drag & Drop with Pointer Events API

**Never use mouse events for drag.** Use the Pointer Events API or `@dnd-kit` — handles mouse, touch, and stylus uniformly.

**Native Pointer Events (lightweight, no library):**
```jsx
function Draggable({ onDrop }) {
  const ref = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    offset.current = {
      x: e.clientX - ref.current.getBoundingClientRect().left,
      y: e.clientY - ref.current.getBoundingClientRect().top,
    };
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    ref.current.style.transform =
      `translate(${e.clientX - offset.current.x}px, ${e.clientY - offset.current.y}px)`;
  }, []);

  const onPointerUp = useCallback((e) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    onDrop?.();
  }, [onDrop]);

  return (
    <div
      ref={ref}
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  );
}
```

**For complex sortable lists, use `@dnd-kit`:**
```jsx
import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, label }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform), // ✅ transform, not layout props
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {label}
    </div>
  );
}

function SortableList({ items, onReorder }) {
  return (
    <DndContext onDragEnd={({ active, over }) => over && onReorder(active.id, over.id)}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map(item => <SortableItem key={item.id} {...item} />)}
      </SortableContext>
    </DndContext>
  );
}
```

Always set `touch-action: none` on draggable elements — without it, mobile browsers intercept pointer events for scrolling.

---

### 4. Reducing Main Thread Blocking

**Offload heavy computation to Web Workers:**
```js
// worker.js
self.onmessage = ({ data }) => {
  self.postMessage(heavyComputation(data));
};

// Component
const workerRef = useRef(null);
useEffect(() => {
  workerRef.current = new Worker(new URL('./worker.js', import.meta.url));
  workerRef.current.onmessage = ({ data }) => setResult(data);
  return () => workerRef.current.terminate();
}, []);
```

**Break long tasks with `requestIdleCallback`:**
```js
function processInChunks(items) {
  let index = 0;
  function processChunk(deadline) {
    while (index < items.length && deadline.timeRemaining() > 1) {
      processItem(items[index++]);
    }
    if (index < items.length) requestIdleCallback(processChunk);
  }
  requestIdleCallback(processChunk);
}
```

**Debounce input-driven renders:**
```js
const debouncedSearch = useMemo(() => debounce((q) => setQuery(q), 200), []);
```

---

### 5. List Virtualization — map() vs Virtual Lists

**Rule: Virtualize any list that could exceed ~50 DOM nodes.**

❌ BAD — all rows in the DOM at once:
```jsx
<div style={{ overflowY: 'auto' }}>
  {items.map(item => <Row key={item.id} {...item} />)}
</div>
```

✅ GOOD — only visible rows in the DOM with **TanStack Virtual**:
```jsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  return (
    <div ref={parentRef} style={{ height: 600, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              transform: `translateY(${virtualRow.start}px)`, // ✅ transform, not top
              width: '100%',
              height: `${virtualRow.size}px`,
            }}
          >
            <Row {...items[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

**For fixed-height rows, `react-window` is lighter:**
```jsx
import { FixedSizeList } from 'react-window';

<FixedSizeList height={600} itemCount={items.length} itemSize={60} width="100%">
  {({ index, style }) => <Row style={style} {...items[index]} />}
</FixedSizeList>
```

**CSS-only alternative for moderate lists:**
```css
.list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 60px;
}
```

---

### 6. Image Optimization

```jsx
// ✅ Always specify dimensions — prevents layout shift (CLS)
<img src={url} width={800} height={600} loading="lazy" decoding="async" alt="..." />

// ✅ Responsive images
<img
  src="image-800.jpg"
  srcSet="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="..."
/>

// ✅ Next.js
import Image from 'next/image';
<Image src="/hero.jpg" width={800} height={600} priority alt="..." />
```

---

### 7. Code Splitting & Bundle Optimization

```jsx
// ✅ Lazy-load heavy routes/components
const HeavyChart = lazy(() => import('./HeavyChart'));

<Suspense fallback={<Spinner />}>
  <HeavyChart />
</Suspense>

// ✅ Preload on hover — starts loading before the user clicks
const preload = () => import('./HeavyChart');
<button onMouseEnter={preload} onClick={navigateToChart}>View Chart</button>
```

---

### 8. Next.js — Server Components

```jsx
// ✅ Server Components for non-interactive content — zero JS to client
export default async function Page() {
  const data = await fetchData(); // Runs on server, no useEffect needed
  return <StaticContent data={data} />;
}

// ✅ Only use 'use client' when you need interactivity
'use client';
export function Counter() { /* useState, event handlers */ }

// ✅ Cache with route segment config
export const revalidate = 3600;
```

---

## Decision Tree

```
Need to animate something?
├── CSS transition → transform + opacity only
├── JS-driven → framer-motion (variants with y/x/scale/opacity)
├── Scroll-linked → Web Animations API or CSS scroll-timeline
└── Layout reflow needed → animate max-height or use FLIP technique

Building a list?
├── < 50 items, static → map() is fine
├── 50–500 items, fixed height → react-window FixedSizeList
├── 50–500 items, variable height → TanStack Virtual
├── 500+ items → TanStack Virtual + memoized rows
└── Moderate list, no JS → content-visibility: auto

Drag & Drop needed?
├── Simple drag → Pointer Events API (no library)
└── Sortable lists → @dnd-kit/sortable

Heavy computation?
├── < 50ms → useMemo
├── 50–200ms → useDeferredValue + startTransition
└── > 200ms → Web Worker

Context causing re-renders?
└── Split by update frequency (user / theme / cart separate)
```

---

## Checklist Before Shipping

- [ ] No `width`/`height`/`top`/`left`/`margin` in CSS transitions or JS animations
- [ ] `will-change: transform` only on actively-animating elements, removed after
- [ ] `touch-action: none` on all draggable elements
- [ ] All lists > 50 items use TanStack Virtual or react-window
- [ ] `loading="lazy"` on all below-fold images
- [ ] All images have explicit `width` and `height` (prevents CLS)
- [ ] Heavy routes code-split with `React.lazy` + `Suspense`
- [ ] Context split by update frequency
- [ ] Heavy computation > 200ms moved to Web Worker
- [ ] `startTransition` wrapping non-urgent state updates
- [ ] `useDeferredValue` on search/filter inputs
- [ ] No `useEffect` for data fetching in Next.js Server Components