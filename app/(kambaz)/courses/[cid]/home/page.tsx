import CourseStatus from "./status";

export default function Home() {
  return (
    <div className="d-flex" id="wd-course-home">
      {/* main column — empty for now or add content later */}
      <div className="flex-fill me-3">
        {/* placeholder or future Modules */}
      </div>

      {/* right sidebar — hide on small screens */}
      <div className="d-none d-lg-block">
        <CourseStatus />
      </div>
    </div>
  );
}
