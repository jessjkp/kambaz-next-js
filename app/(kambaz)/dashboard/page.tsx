/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as db from "../database/index";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { RootState } from "../store";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
const currentUser = useSelector((state: RootState) => (state as any).accountReducer?.currentUser);
  const enrollments = (db.enrollments as any[]);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "CS",
    credits: 4,
    image: "/images/dashboardImage.jpg",
    description: "New Description",
  });


  const [ enrollmentList, setEnrollmentList] = useState<any[]>(enrollments);
  const enrolledCourses = courses.filter((c: any) =>
    enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === c._id
    )
  );

  const isEnrolled = (courseId: string) => enrollmentList.some((e: any) => e.user === currentUser?._id && e.course == courseId);
  const toggleEnrollment = (courseId: string) => {
    if (isEnrolled(courseId)) {
      setEnrollmentList(enrollmentList.filter((e: any) => !(e.user===currentUser?._id && e.course === courseId)));
    } else {
      setEnrollmentList([...enrollmentList, {_id: Date.toString(), user: currentUser?._id, course: courseId}]);
    }
  }

  const displayedCourses = showAllCourses ? courses : enrolledCourses;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
        <button
        className="btn btn-primary float-end"
        onClick={() => setShowAllCourses(!showAllCourses)}
        id="wd-enrollments-btn"
      >
        Enrollments
      </button>
      <hr />

      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          id="wd-update-course-click"
          onClick={() => dispatch(updateCourse(course))}
        >
          Update
        </button>
      </h5>

      <br />

      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />

      <FormControl
        value={course.description}
        className="mb-2"
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }
      />

      <hr />

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
            {displayedCourses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={isEnrolled(c._id) ? `/courses/${c._id}/home` : "#"}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => { if (!isEnrolled(c._id)) e.preventDefault(); }}
                >
                  <CardImg
                    src={c.image || "/images/dashboardImage.jpg"}
                    variant="top" width="100%" height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}>
                      {c.description}
                    </CardText>

                    <Button variant="primary">Go</Button>

                    {showAllCourses ? (
                      isEnrolled(c._id) ? (
                        <button
                          onClick={(e) => { e.preventDefault(); toggleEnrollment(c._id); }}
                          className="btn btn-danger float-end"
                          id="wd-unenroll-btn">
                          Unenroll
                        </button>
                      ) : (
                        <button
                          onClick={(e) => { e.preventDefault(); toggleEnrollment(c._id); }}
                          className="btn btn-success float-end"
                          id="wd-enroll-btn">
                          Enroll
                        </button>
                      )
                    ) : (
                      <>
                        <button id="wd-edit-course-click"
                          onClick={(e) => { e.preventDefault(); setCourse(c); }}
                          className="btn btn-warning me-2 float-end">
                          Edit
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); dispatch(deleteCourse(c._id)); }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}