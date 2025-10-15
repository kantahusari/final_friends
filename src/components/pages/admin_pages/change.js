import React, { useState, useEffect, useCallback } from "react";
import { adminService } from "../../serviceworker/admin";
import Card from "react-bootstrap/Card";

export default function ChangePassword() {
  const [is_open, setis_open] = useState(false);
  const [users, setusers] = useState([]);

  const [user, setuser] = useState([]);

  const fetchUsers = useCallback(async () => {
    const response = await adminService.get_users();
    setusers(response);
  }, []);

  function open_modal(id) {
    setis_open(!is_open);
    const selectedUser = users.find((usr) => usr.id === id);
    setuser(selectedUser);
  }

  function close_modal() {
    setis_open(false);
    setuser([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.uname || !user.upwd || !user.uemail) {
      alert("All fields are required.");
      return;
    }
    if (user.upwd.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (user.uname.length < 4) {
      alert("User Name must be at least 4 characters long.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(user.uemail)) {
      alert("Email address is invalid.");
      return;
    }

    const confirm = window.confirm("Are you sure you want to update this user?");
    if (!confirm) return;
    const result = await adminService.update_user({ id: user.id, ...user });
    if (result.error) {
      alert("Error updating user: " + result.error);
      return;
    }
    if (result.success) {
      alert("User updated successfully (not really, this is a demo).");
      close_modal();
      fetchUsers();
    }
  }

  function render_modal() {
    return (
      <div className="message_modal" style={{ display: is_open ? "block" : "none" }}>
        <div className="message_modal_content">
          <Card className="service-card card_transparent edituser_card">
            <Card.Body>
              <Card.Title>Update User</Card.Title>
              <form onSubmit={handleSubmit} className="edit_user_form">
                <label>
                  User Name:
                  <input type="text" value={user.uname || ""} onChange={(e) => setuser({ ...user, uname: e.target.value })} className="form-control input_field" />
                </label>
                <label>
                  Password:
                  <input type="password" value={""} onChange={(e) => setuser({ ...user, upwd: e.target.value })} className="form-control input_field" placeholder="Leave blank to keep old one" />
                </label>
                <label>
                  Email:
                  <input type="email" value={user.uemail || ""} onChange={(e) => setuser({ ...user, uemail: e.target.value })} className="form-control input_field" />
                </label>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button type="button" onClick={close_modal} className="btn btn-primary">
                  Cancel
                </button>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }

  function render_users() {
    return users && users.length > 0 ? (
      <table className="messages_table">
        <thead>
          <tr>
            <th className="messages_th">user name</th>
            <th className="messages_th">Pass Word</th>
            <th className="messages_th">email</th>
            <th className="messages_th"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((usr) => (
            <tr key={usr.id}>
              <td className="messages_td messages_icon">{usr.uname}</td>
              <td className="messages_td messages_icon">{`${usr.upwd.slice(0, 3)} ***`}</td>
              <td className="messages_td messages_icon">{usr.uemail}</td>
              <td className="messages_td messages_icon">
                <button onClick={() => open_modal(usr.id)} className="btn btn-primary">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="no-messages">No Users Found</div>
    );
  }

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUsers]);
  return (
    <div>
      {render_users()}
      {render_modal()}
    </div>
  );
}
