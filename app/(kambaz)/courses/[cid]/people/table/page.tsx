import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
 return (
  <div id="wd-people-table">
   <Table striped>
    <thead>
     <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
    </thead>
    <tbody>
     <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Tony</span>{" "}
          <span className="wd-last-name">Stark</span></td>
      <td className="wd-login-id">001234561S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-01</td>
      <td className="wd-total-activity">10:21:32</td></tr>
<tr>
            <td className="text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              Bruce Wayne
            </td>
            <td>009999999B</td>
            <td>S102</td>
            <td>STUDENT</td>
            <td>2020-10-02</td>
            <td>08:11:10</td>
          </tr>
          <tr>
            <td className="text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              Steve Rogers
            </td>
            <td>007777777C</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-10-03</td>
            <td>12:45:02</td>
          </tr>
                    <tr>
            <td className="text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              Natasha Romanoff
            </td>
            <td>006666666N</td>
            <td>S103</td>
            <td>TA</td>
            <td>2020-10-03</td>
            <td>15:22:44</td>
          </tr>
    </tbody>
   </Table>
  </div> );}