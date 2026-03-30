"use client"
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { FormCheck } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
      const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [module, setModule] = useState({
  id: 1,
  name: "Module 1",
  description: "Learning Node and Express",
});

  
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment` 
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
  <h4>Modifying Properties</h4>

      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-title"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      <a
        id="wd-update-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a> 
  <h4>Modules name</h4>

      <FormControl
        className="w-75 mb-2"
        id="wd-module-name"
        value={module.name}
        onChange={(e) =>
          setModule({ ...module, name: e.target.value })
        }
      />

      <a
        id="wd-update-module-name"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name/${module.name}`}
      >
        Update name
      </a> 
  <h4>Modules description</h4>

      <FormControl
        className="w-75 mb-2"
        id="wd-module-description"
        value={module.description}
        onChange={(e) =>
          setModule({ ...module, description: e.target.value })
        }
      />

      <a
        id="wd-update-module-description"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/description/${module.description}`}
      >
        Update description
      </a> 
  <h4>Assignment Score</h4>

      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-score"
        value={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />

      <a
        id="wd-update-assignment-score"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a> 
      <FormCheck
        type="checkbox"
        label="Completed"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked})
        }
      />

      <a
        id="wd-update-assignment-completed"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update completed
      </a> 
    </div>
);}
