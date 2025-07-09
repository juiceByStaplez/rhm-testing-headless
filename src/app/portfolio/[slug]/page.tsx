import { PortfolioProjectView } from "@/components";
import { wixClient } from "@/lib/wixClient";
import type { PortfolioProject } from "@/types";

type PageProps = {
  params: {
    slug: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    then?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    finally?: any;
    [Symbol.toStringTag]?: string;
  };
};

export default async function Page({ params }: PageProps) {
  const res = await wixClient.items
    .query<PortfolioProject>("PortfolioProjects")
    .eq("link-portfolio-projects-1-companyTitle", `/portfolio/${params.slug}`)
    .limit(1)
    .find();

  const project = res.items[0];

  return <PortfolioProjectView project={project} />;
}
