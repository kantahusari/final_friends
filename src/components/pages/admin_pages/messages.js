import React, { useState, useEffect, useCallback } from "react";
import { adminService } from "../../serviceworker/admin";
import { get_count } from "../../store/storeslice";

import Pagination from "react-bootstrap/Pagination";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { GoRead } from "react-icons/go";
import { FaRegWindowClose } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function Messages() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.message.count);

  const [data, setdata] = useState([]);
  const [limit, setlimit] = useState(10);
  const [offSet, setoffSet] = useState(0);

  const [is_open, setis_open] = useState(false);
  const [activeMessage, setactiveMessage] = useState(null);
  const fetchMessages = useCallback(async () => {
    const response = await adminService.get_messages({ limit, offSet });
    setdata(response);
  }, [limit, offSet]);

  const fetchMessagesCount = useCallback(async () => {
    const response = await adminService.get_unread_messages();
    dispatch(get_count({ count: response.unread }));
  }, [dispatch]);

  async function delete_message(id) {
    const confirm = window.confirm("Are you sure you want to delete this message?");
    if (!confirm) return;
    await adminService.delete_message({ id });
    fetchMessages();
    await fetchMessagesCount();
  }

  async function open_modal(criteria, msg = null, id = null) {
    if (criteria === true) {
      setactiveMessage(msg);
      setis_open(true);
      await adminService.open_message({ id });
      fetchMessages();
      await fetchMessagesCount();
    } else {
      setactiveMessage(null);
      setis_open(false);
    }
  }

  function render_modal() {
    return (
      <div className="message_modal" style={{ display: is_open ? "block" : "none" }}>
        <div className="message_modal_content">
          {activeMessage ? (
            <div className="message_details">
              <FaRegWindowClose onClick={() => setis_open(false)} className="close" />
              <p>{activeMessage.subject}</p>
              <p>{activeMessage.mcontent}</p>
            </div>
          ) : (
            <p>No message selected</p>
          )}
        </div>
      </div>
    );
  }

  function render_messages() {
    return data && data.messages && data.messages.length > 0 ? (
      <table className="messages_table">
        <thead>
          <tr>
            <th className="messages_th">Status</th>
            <th className="messages_th">From</th>
            <th className="messages_th">Phone</th>
            <th className="messages_th">Subject</th>
            <th className="messages_th">Received At</th>
            <th className="messages_th"></th>
          </tr>
        </thead>
        <tbody>
          {data.messages.map((msg) => (
            <tr key={msg.id}>
              <td className="messages_td messages_icon" onClick={() => open_modal(true, msg, msg.id)}>
                {msg.is_read === 0 ? <MdOutlineMarkEmailUnread size={40} style={{ marginRight: "10px" }} /> : <GoRead size={40} style={{ marginRight: "10px" }} />}
              </td>
              <td className="messages_td">
                <strong>{msg.name}</strong> &lt;{msg.email}&gt;
              </td>
              <td className="messages_td">
                <strong>{msg.phone}</strong>
              </td>
              <td className="messages_td">{msg.subject}</td>
              <td className="messages_td">{new Date(msg.createdat).toLocaleString().split(",")[0]}</td>
              <td className="messages_td messages_icon">
                <RiDeleteBin6Line onClick={() => delete_message(msg.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="no-messages">No messages found.</div>
    );
  }

  function render_pagination() {
    return data && data.messages && data.messages.length > 0 ? (
      <Pagination>
        <Pagination.First onClick={() => setoffSet(0)} disabled={offSet === 0} />
        <Pagination.Prev onClick={() => setoffSet(Math.max(0, offSet - limit))} disabled={offSet === 0} />
        <Pagination.Item active>{Math.floor(offSet / limit) + 1}</Pagination.Item>
        <Pagination.Item disabled> of {Math.ceil(data.total / limit)}</Pagination.Item>
        <Pagination.Next onClick={() => setoffSet(offSet + limit)} disabled={offSet + limit >= data.total} />
        <Pagination.Last onClick={() => setoffSet(Math.floor((data.total - 1) / limit) * limit)} disabled={offSet + limit >= data.total} />
      </Pagination>
    ) : null;
  }

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMessages, limit, offSet]);

  return (
    <div className="messages_cont">
      {render_messages()}
      {render_pagination()}
      {render_modal()}
    </div>
  );
}
