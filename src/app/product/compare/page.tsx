import ProductPageTemplate from "@/components/pages/product/ProductTemplate";
import data from "./data.json";

export default function Compare() {
  return <ProductPageTemplate data={data.page} />;
}
