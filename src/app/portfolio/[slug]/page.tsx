import { PortfolioProjectView } from "@/components";
import { wixClient } from "@/lib/wixClient";
import type { PortfolioProject } from "@/types";

const PortfolioPage = async ({ params }: { params: { slug: string } }) => {
  const res = await wixClient.items
    .query<PortfolioProject>("PortfolioProjects")
    .eq("link-portfolio-projects-1-companyTitle", `/portfolio/${params.slug}`)
    .limit(1)
    .find();

  const project = res.items[0];

  return <PortfolioProjectView project={project} />;
};

export default PortfolioPage;
