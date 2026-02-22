"use client";

import { useParams } from "next/navigation";
import * as db from "../../../database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
type Lesson = {
  _id: string;
  name: string;
};

type Module = {
  _id: string;
  course: string;
  name: string;
  lessons?: Lesson[];
};
export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const modules = db.modules;

  return (
    <div>
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: Module) => module.course === cid)
          .map((module: Module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {module.name}
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
