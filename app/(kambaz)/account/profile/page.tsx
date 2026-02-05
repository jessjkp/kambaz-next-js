"use client";

import Link from "next/link";
import FormControl from "react-bootstrap/FormControl";
import FormSelect from "react-bootstrap/FormSelect";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4" style={{ maxWidth: 520 }}>
      <h1>Profile</h1>

      <FormControl className="mb-2" defaultValue="alice" />
      <FormControl className="mb-2" defaultValue="123" type="password" />
      <FormControl className="mb-2" defaultValue="Alice" />
      <FormControl className="mb-2" defaultValue="Wonderland" />
      <FormControl className="mb-2" type="date" />
      <FormControl className="mb-2" defaultValue="alice@wonderland.com" />

      <FormSelect className="mb-3" defaultValue="User">
        <option>User</option>
        <option>Faculty</option>
        <option>Student</option>
        <option>TA</option>
      </FormSelect>

      <Link
        id="wd-signout-btn"
        href="/account/signin"
        className="btn btn-danger w-100"
      >
        Signout
      </Link>
    </div>
  );
}
