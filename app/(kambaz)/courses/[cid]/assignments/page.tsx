/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Button, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { FaPlus, FaSearch, FaCheckCircle, FaRegFileAlt, FaTrash } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa6";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";
import * as client from "./client";


export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const { assignments}  = useSelector( (state:RootState) => state.assignmentReducer); 

  const courseAssignments = (assignments as any[]).filter((a: any) => a.course === cid);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const deleteClick = (id: string) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedId) {
      await client.deleteAssignment(selectedId);
      dispatch(deleteAssignment(selectedId));
    }
    setShowConfirm(false);
    setSelectedId(null);
  };
  return (
    <div id="wd-assignments" className="wd-main-content-offset p-4">
      {showConfirm && (
            <div className="alert alert-warning d-fle4x align-items-center mb-4">
              <span>Are you sure you want to delete this?</span>
          <div>
            <Button variant="danger" className="me-2" onClick={confirmDelete}>
              Yes
            </Button>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div className="d-flex align-items-center mb-4">
        <InputGroup style={{ maxWidth: 420 }}>
          <InputGroup.Text className="bg-white">
            <FaSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search..." />
        </InputGroup>

        <div className="ms-auto text-nowrap">
          <Button variant="secondary" size="lg" className="me-2">
            <FaPlus className="me-2" />
            Group
          </Button>

          <Link
            href={`/courses/${cid}/assignments/new`}
            className="btn btn-danger btn-lg"
          >
            <FaPlus className="me-2" />
            Assignment
          </Link>
        </div>
      </div>

      <ListGroup className="rounded-0">
        <ListGroup.Item className="p-3 bg-secondary d-flex align-items-center">
          <BsGripVertical className="me-2 fs-3 text-secondary" />
          <FaCaretDown className="me-2" />
          <span className="fw-bold">ASSIGNMENTS</span>

          <div className="ms-auto d-flex align-items-center gap-3">
            <Badge pill bg="light" text="dark" className="border px-3 py-2">
              40% of Total
            </Badge>
            <FaPlus />
            <IoEllipsisVertical />
          </div>
        </ListGroup.Item>

        {courseAssignments.map((a:any) => (
          <ListGroup.Item
            key={a._id}
            className="p-3 d-flex align-items-center border-start border-5 border-success"
          >
            <BsGripVertical className="me-3 fs-3 text-secondary" />
            <FaRegFileAlt className="me-3 fs-3 text-success" />

            <div className="flex-fill">
              <Link
                href={`/courses/${cid}/assignments/${a._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="fw-bold fs-5">{a.title}</div>
                <div className="text-muted">
                  <span className="text-danger fw-semibold">
                    {a.multipleModules ? "Multiple Modules" : "Single Module"}
                  </span>
                  {" | "}
                  {a.available ? `Not available until ${a.available}` : "Not available yet"}
                  {" | "}
                  {a.due ? `Due ${a.due}` : "No due date"}
                  {" | "}
                  {a.points ?? 0} pts
                </div>
              </Link>
            </div>
            <FaTrash
              className="text-danger me-3 fs-5"
              style={{ cursor: "pointer" }}
              onClick={() => deleteClick(a._id)}
            />
            <FaCheckCircle className="fs-3 text-success me-3" />
            <IoEllipsisVertical className="fs-4" />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
