/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import PeopleTable from "./table";
import * as client from "../../../account/client";
import { useParams } from "next/navigation";

export default function People() {
  const [users, setUsers] = useState<any[]>([]);
  const { cid } = useParams();

  const fetchUsers = async () => {
    if (!cid) return;
    const users = await client.findUsersForCourse(cid as string);
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}