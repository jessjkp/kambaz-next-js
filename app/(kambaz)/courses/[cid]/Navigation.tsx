"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation">
      {links.map((label) => {
        const basePath = label.toLowerCase();
        const href =
          label === "People"
            ? `/courses/${cid}/people/table`
            : `/courses/${cid}/${basePath}`;

        const isActive = pathname.startsWith(href);

        return (
          <span key={label}>
            <Link
              href={href}
              id={`wd-course-${basePath}-link`}
              className={isActive ? "text-danger" : ""}
            >
              {label}
            </Link>
            <br />
          </span>
        );
      })}
    </div>
  );
}
