import { notFound } from "next/navigation";
import productsData from "../../../../data/products.json";
import ProductDetail from "../../components/ProductDetail";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product || !product.active) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
