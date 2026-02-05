"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Badge,
  Button,
  FormControl,
  InputGroup,
  ListGroup,
} from "react-bootstrap";

import { FaPlus, FaSearch, FaCheckCircle, FaRegFileAlt } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa6";

export default function AssignmentsPage() {
  const { cid } = useParams();

  return (
    <div id="wd-assignments" className="wd-main-content-offset p-4">

      {/* Top controls row */}
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

          <Button variant="danger" size="lg">
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>
      </div>

      {/* Assignment group */}
      <ListGroup className="rounded-0">

        {/* Group header */}
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

        {/* A1 */}
        <ListGroup.Item className="p-3 d-flex align-items-center border-start border-5 border-success">
          <BsGripVertical className="me-3 fs-3 text-secondary" />
          <FaRegFileAlt className="me-3 fs-3 text-success" />

          <div className="flex-fill">
            <Link
              href={`/courses/${cid}/assignments/A1`}
              className="text-decoration-none text-dark"
            >
              <div className="fw-bold fs-5">A1</div>
              <div className="text-muted">
                <span className="text-danger fw-semibold">Multiple Modules</span>
                {" | "}Not available until May 6 at 12:00am{" | "}
                Due May 13 at 11:59pm{" | "}100 pts
              </div>
            </Link>
          </div>

          <FaCheckCircle className="fs-3 text-success me-3" />
          <IoEllipsisVertical className="fs-4" />
        </ListGroup.Item>

        {/* A2 */}
        <ListGroup.Item className="p-3 d-flex align-items-center border-start border-5 border-success">
          <BsGripVertical className="me-3 fs-3 text-secondary" />
          <FaRegFileAlt className="me-3 fs-3 text-success" />

          <div className="flex-fill">
            <Link
              href={`/courses/${cid}/assignments/A2`}
              className="text-decoration-none text-dark"
            >
              <div className="fw-bold fs-5">A2</div>
              <div className="text-muted">
                <span className="text-danger fw-semibold">Multiple Modules</span>
                {" | "}Not available until May 13 at 12:00am{" | "}
                Due May 20 at 11:59pm{" | "}100 pts
              </div>
            </Link>
          </div>

          <FaCheckCircle className="fs-3 text-success me-3" />
          <IoEllipsisVertical className="fs-4" />
        </ListGroup.Item>

        {/* A3 */}
        <ListGroup.Item className="p-3 d-flex align-items-center border-start border-5 border-success">
          <BsGripVertical className="me-3 fs-3 text-secondary" />
          <FaRegFileAlt className="me-3 fs-3 text-success" />

          <div className="flex-fill">
            <Link
              href={`/courses/${cid}/assignments/A3`}
              className="text-decoration-none text-dark"
            >
              <div className="fw-bold fs-5">A3</div>
              <div className="text-muted">
                <span className="text-danger fw-semibold">Multiple Modules</span>
                {" | "}Not available until May 20 at 12:00am{" | "}
                Due May 27 at 11:59pm{" | "}100 pts
              </div>
            </Link>
          </div>

          <FaCheckCircle className="fs-3 text-success me-3" />
          <IoEllipsisVertical className="fs-4" />
        </ListGroup.Item>

      </ListGroup>
    </div>
  );
}
