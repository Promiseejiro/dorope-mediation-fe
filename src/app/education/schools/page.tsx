// app/teachers/page.tsx
import EducationPageTemplate from "@/components/pages/education/EducationPageTemplate";
import data from "./data.json";

export default function Schools() {
  return <EducationPageTemplate data={data.page} />;
}
