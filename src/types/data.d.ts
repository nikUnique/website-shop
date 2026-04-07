declare module "../../data/products.json" {
  import type { Product } from "./product";
  const products: Product[];
  export default products;
}