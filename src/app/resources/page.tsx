import ResourcesBlog from "@/components/resources/ResourcesBlog";
import ResourcesCategories from "@/components/resources/ResourcesCategories";
import ResourcesFeatured from "@/components/resources/ResourcesFeatured";
import ResourcesHero from "@/components/resources/ResourcesHero";
import ResourcesNewsletter from "@/components/resources/ResourcesNewsletter";
import ResourcesTools from "@/components/resources/ResourcesTools";
import ResourcesWebinars from "@/components/resources/ResourcesWebinars";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen ">
      <ResourcesHero />
      <ResourcesCategories />
      <ResourcesFeatured />
      <ResourcesBlog />
      <ResourcesWebinars />
      <ResourcesTools />
      <ResourcesNewsletter />
    </div>
  );
}
