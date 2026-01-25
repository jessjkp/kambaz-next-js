"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams();

  return (
    <div id="wd-courses-navigation">
      <Link href={`/courses/${cid}/home`} id="wd-course-home-link">
        Home
      </Link>
      <br />
      <Link href={`/courses/${cid}/modules`} id="wd-course-modules-link">
        Modules
      </Link>
      <br />
      <Link href={`/courses/${cid}/piazza`} id="wd-course-piazza-link">
        Piazza
      </Link>
      <br />
      <Link href={`/courses/${cid}/zoom`} id="wd-course-zoom-link">
        Zoom
      </Link>
      <br />
      <Link href={`/courses/${cid}/assignments`} id="wd-course-assignments-link">
        Assignments
      </Link>
      <br />
      <Link href={`/courses/${cid}/quizzes`} id="wd-course-quizzes-link">
        Quizzes
      </Link>
      <br />
      <Link href={`/courses/${cid}/grades`} id="wd-course-grades-link">
        Grades
      </Link>
      <br />
    </div>
  );
}