import { wixClient } from "@/lib/wixClient";
import { PortfolioListView } from "@/components";
import type { PortfolioProject, StateCount } from "@/types";

function countProjectsByState(projects: PortfolioProject[]): StateCount {
  const counts: StateCount = {};
  for (const project of projects) {
    const state = extractStateAbbr(project.location);
    if (!state) continue;
    counts[state] = (counts[state] || 0) + 1;
  }
  return counts;
}

function extractStateAbbr(location: string): string | null {
  const match = location.match(/\b[A-Z]{2}\b/);
  return match ? match[0] : null;
}

export default async function Page() {
  const res = await wixClient.items
    .query<PortfolioProject>("PortfolioProjects")
    .limit(100)
    .find();

  const projects = res.items;

  const projectCountsByState: StateCount = countProjectsByState(projects);

  return (
    <PortfolioListView
      projects={projects}
      projectCountsByState={projectCountsByState}
    />
  );
}
