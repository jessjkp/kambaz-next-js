/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";

export default function EditAssignmentPage() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state:RootState) => state.assignmentReducer);
  const existing = (assignments as any[]).find((a:any) => a._id === aid);
  const [assignment, setAssignment] = useState<any>(existing || { 
    title: "New Assignment",
    description:"",
    points:100,
    due: "2026-03-14T23:59",
    avaiableFrom: "2025-03-13T00:00",
    course: cid,
  })
  const handleSave = () => {
    if (aid==="new") {
      dispatch(addAssignment({...assignment, course: cid}));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/courses/${cid}/assignments`);
  }
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
          <Form.Control type="text" value={assignment.title}  
          onChange={(e)=>setAssignment({...assignment, title: e.target.value})}/>
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-4" controlId="wd-assignment-description">
          <Form.Control as="textarea" rows={8} value={assignment.description}  
          onChange={(e)=>setAssignment({...assignment, description: e.target.value})} />
        </Form.Group>

        {/* Points */}
        <Row className="mb-3 align-items-center">
          <Col md={3} className="text-md-end">
            <Form.Label className="mb-0">Points</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control type="number" value={assignment.points}  
          onChange={(e)=>setAssignment({...assignment, points: parseInt(e.target.value)})} />
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
                  value={assignment.due}  
                  onChange={(e)=>setAssignment({...assignment, due: e.target.value})}
                />
              </Form.Group>

              {/* Available From / Until */}
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="fw-semibold">Available from</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={assignment.avaiableFrom}  
                     onChange={(e)=>setAssignment({...assignment, avaiableFrom: e.target.value})}
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
          <Button variant="danger" onClick={handleSave}>Save</Button>
        </div>
      </Form>
    </div>
  );
}
