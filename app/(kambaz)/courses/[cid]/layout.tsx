import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Course 1234
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block me-3">
          <CourseNavigation />
        </div>

        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
