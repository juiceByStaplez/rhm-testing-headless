import { PortfolioProject, StateCount } from "@/types";
import { wixMediaToUrl } from "@/lib/helpers";
import Link from "next/link";
import { StateMap } from "@/components";

type PortfolioListViewProps = {
  projects: PortfolioProject[];
  projectCountsByState: StateCount;
};

export default function PortfolioListView({
  projects,
  projectCountsByState,
}: PortfolioListViewProps) {
  return (
    <>
      <StateMap stateCounts={projectCountsByState} />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {projects.map((project) => {
          const slug = project["link-portfolio-projects-1-companyTitle"];
          return (
            <Link
              key={project._id}
              href={`${slug}`}
              className="block hover:opacity-90 transition"
            >
              <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                <div className="flex flex-1 flex-col p-8">
                  <img
                    alt={project.companyTitle}
                    src={wixMediaToUrl(project.image)}
                    className="mx-auto size-32 shrink-0 rounded-full"
                  />
                  <h3 className="mt-6 text-sm font-medium text-gray-900">
                    {project.companyTitle}
                  </h3>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}
