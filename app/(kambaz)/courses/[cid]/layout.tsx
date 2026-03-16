"use client";

import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
  image?: string;
};

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const { courses } = useSelector((state: RootState) => state.coursesReducer) as {
    courses: Course[];
  };
  const course = courses.find((c) => c._id === cid);

  const [showCourseNavigation, setShowCourseNavigation] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowCourseNavigation(!showCourseNavigation)}
          style={{ cursor: "pointer" }}
        />
        <Breadcrumb course={course} />
      </h2>
      <hr />

      <div className="d-flex">
        {showCourseNavigation && (
          <div>
            <CourseNavigation cid={cid} />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}