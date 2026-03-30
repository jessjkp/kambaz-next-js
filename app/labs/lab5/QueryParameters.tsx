"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function QueryParameters() {
const [a, setA] = useState(0);
const [b, setB] = useState(0);
  return (
<div id="wd-query-parameters">
  <h3>Query Parameters</h3>
<FormControl
  id="wd-query-parameter-a"
  className="mb-2"
  value={a}
  type="number"
  onChange={(e) =>
    setA(e.target.value === "" ? 0 : parseInt(e.target.value))
  }
/>

<FormControl
  id="wd-query-parameter-b"
  className="mb-2"
  value={b}
  type="number"
  onChange={(e) =>
    setB(e.target.value === "" ? 0 : parseInt(e.target.value))
  }
/>
  <a id="wd-query-parameter-add"
     href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}>
  <button>Add {a} + {b}</button>
  </a>
  <a id="wd-query-parameter-subtract"
     href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}>
  <button>Subtract {a} - {b}</button>
  </a>
    <a id="wd-query-parameter-subtract"
     href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}>
  <button>Multiply {a} * {b}</button>
  </a>
    <a id="wd-query-parameter-subtract"
    href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}>
  <button>Divide {a} / {b}</button>
  </a>
  <hr />
</div>

  );
}