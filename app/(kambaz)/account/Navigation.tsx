"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaRegCircleUser } from "react-icons/fa6";

export default function AccountNavigation() {
  return (
    <ListGroup id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <ListGroupItem className="border-0 text-center">
        <FaRegCircleUser className="fs-1 text-danger" />
        <div className="text-danger">Account</div>
      </ListGroupItem>

      <Link
        href="/account/signin"
        id="wd-account-signin-link"
        className="list-group-item text-danger border-0"
      >
        Signin
      </Link>

      <Link
        href="/account/signup"
        id="wd-account-signup-link"
        className="list-group-item text-danger border-0"
      >
        Signup
      </Link>

      <Link
        href="/account/profile"
        id="wd-account-profile-link"
        className="list-group-item text-danger border-0"
      >
        Profile
      </Link>

      <ListGroupItem className="border-0">
        <Link href="/dashboard" className="text-decoration-none text-dark">
          Dashboard
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
