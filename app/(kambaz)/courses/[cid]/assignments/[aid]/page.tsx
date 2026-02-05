"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Col,
  Form,
  Row,
} from "react-bootstrap";

export default function EditAssignmentPage() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  return (
    <div id="wd-edit-assignment" className="wd-main-content-offset p-4">
      {/* Optional breadcrumb-ish header (safe to remove if your layout already shows it) */}
      <div className="mb-3 text-muted">
        <Link href={`/courses/${cid}/assignments`} className="text-decoration-none">
          Assignments
        </Link>{" "}
        / <span className="text-dark">{aid}</span>
      </div>

      <Form style={{ maxWidth: 850 }}>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-assignment-name">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={aid} />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-4" controlId="wd-assignment-description">
          <Form.Control as="textarea" rows={8} defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kambaz application
• Links to all relevant source code repositories

The Kambaz application should include a link to navigate back to the landing page.`} />
        </Form.Group>

        {/* Points */}
        <Row className="mb-3 align-items-center">
          <Col md={3} className="text-md-end">
            <Form.Label className="mb-0">Points</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control type="number" defaultValue={100} />
          </Col>
        </Row>

        {/* Assignment Group */}
        <Row className="mb-3 align-items-center">
          <Col md={3} className="text-md-end">
            <Form.Label className="mb-0">Assignment Group</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Select defaultValue="ASSIGNMENTS">
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Display Grade as */}
        <Row className="mb-3 align-items-center">
          <Col md={3} className="text-md-end">
            <Form.Label className="mb-0">Display Grade as</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Select defaultValue="Percentage">
              <option>Percentage</option>
              <option>Points</option>
              <option>Letter Grade</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Submission Type */}
        <Row className="mb-3 align-items-center">
          <Col md={3} className="text-md-end">
            <Form.Label className="mb-0">Submission Type</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Select defaultValue="Online">
              <option>Online</option>
              <option>On Paper</option>
              <option>No Submission</option>
            </Form.Select>

            {/* Online Entry Options box */}
            <div className="border rounded p-3 mt-3">
              <div className="fw-semibold mb-2">Online Entry Options</div>

              <Form.Check type="checkbox" label="Text Entry" className="mb-2" />
              <Form.Check type="checkbox" label="Website URL" defaultChecked className="mb-2" />
              <Form.Check type="checkbox" label="Media Recordings" className="mb-2" />
              <Form.Check type="checkbox" label="Student Annotation" className="mb-2" />
              <Form.Check type="checkbox" label="File Uploads" />
            </div>
          </Col>
        </Row>

        {/* Assign section */}
        <Row className="mb-4">
          <Col md={3} className="text-md-end">
            <Form.Label className="mb-0">Assign</Form.Label>
          </Col>
          <Col md={9}>
            <div className="border rounded p-3">
              {/* Assign to */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Assign to</Form.Label>
                <Form.Control type="text" defaultValue="Everyone" />
              </Form.Group>

              {/* Due */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  defaultValue="2024-05-13T23:59"
                />
              </Form.Group>

              {/* Available From / Until */}
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="fw-semibold">Available from</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    defaultValue="2024-05-06T00:00"
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="fw-semibold">Until</Form.Label>
                  <Form.Control type="datetime-local" />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Bottom buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Link href={`/courses/${cid}/assignments`} className="btn btn-light border">
            Cancel
          </Link>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
