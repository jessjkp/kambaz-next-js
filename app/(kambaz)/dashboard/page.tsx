"use client";

import Link from "next/link";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import CardText from "react-bootstrap/CardText";
import Button from "react-bootstrap/Button";

const courses = [
  { id: "1234", title: "CS1234 React JS", desc: "Full Stack software developer" },
  { id: "5678", title: "Math1234 Calc 2", desc: "Math" },
  { id: "7889", title: "ENGW1234 Advanced Writing", desc: "English" },
  { id: "1000", title: "BIO1234 Intro to Bio", desc: "Biology" },
  { id: "9028", title: "SPNS1234 Elementary Spanish 1", desc: "Spanish" },
  { id: "4321", title: "CS2345 Computer Science", desc: "Coding" },
  { id: "4953", title: "CS4550 Web Design", desc: "Web Development" },
];

export default function Dashboard() {
  return (
    <div
      id="wd-dashboard"
      className="p-4"
      style={{
        marginLeft: 120,
      }}
    >
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c) => (
            <Col key={c.id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card className="h-100">
                <Link
                  href={`/courses/${c.id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src="/images/dashboardImage.jpg"
                    alt={c.title}
                    style={{ height: 160, objectFit: "cover" }}
                  />

                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.title}
                    </CardTitle>

                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.desc}
                    </CardText>

                    <Button variant="primary">Go</Button>
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
