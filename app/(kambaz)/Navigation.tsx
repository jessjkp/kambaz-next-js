"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      {/* NEU link */}
      <ListGroupItem
        className="bg-black border-0 text-center py-3"
        as="a"
        href="https://www.northeastern.edu/"
        target="_blank"
        id="wd-neu-link"
      >
        <span className="text-danger fw-bold">NEU</span>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link href="/account" id="wd-account-link"
          className="text-white text-decoration-none">
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-white text-center py-2">
        <Link href="/dashboard" id="wd-dashboard-link"
          className="text-danger text-decoration-none">
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link href="/dashboard" id="wd-course-link"
          className="text-white text-decoration-none">
          <LiaBookSolid className="fs-1 text-white" />
          <br />
          Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link href="/calendar" id="wd-calendar-link"
          className="text-white text-decoration-none">
          <IoCalendarOutline className="fs-1 text-white" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link href="/inbox" id="wd-inbox-link"
          className="text-white text-decoration-none">
          <FaInbox className="fs-1 text-white" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link href="/labs" id="wd-labs-link"
          className="text-white text-decoration-none">
          <LiaCogSolid className="fs-1 text-white" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
