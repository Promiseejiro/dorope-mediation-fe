// app/skills-assessment/page.tsx
import ProductPageTemplate from "@/components/pages/product/ProductTemplate";
import data from "./data.json";

export default function ExamSoftware() {
  return <ProductPageTemplate data={data.page} />;
}
