// app/teachers/page.tsx
import EducationPageTemplate from "@/components/pages/education/EducationPageTemplate";
import data from "./data.json";

export default function Teachers() {
  return <EducationPageTemplate data={data.page} />;
}
