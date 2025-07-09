import { PortfolioProject } from "@/types";

type PortfolioProjectViewProps = {
  project: PortfolioProject;
};

export default function PortfolioProjectView({
  project,
}: PortfolioProjectViewProps) {
  return <div>{project.companyTitle}</div>;
}
