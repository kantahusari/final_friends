import React, { useState, useEffect } from "react";
import { adminService } from "../../serviceworker/admin";

export default function Days() {
  const [days, setDays] = useState([]);

  async function updateDay(index, field, value) {
    const confirm = window.confirm("Are you sure you want to update this field?");
    if (!confirm) return;
    const data = await adminService.update_days({ index, field, value });
    setDays(data);
  }

  useEffect(() => {
    const fetchDays = async () => {
      const data = await adminService.get_days();
      setDays(data);
    };
    fetchDays();
  }, []);

  return (
    <div className="time_selection">
      <table className="days_table">
        <thead>
          <tr>
            <th className="days_th">Day</th>
            <th className="days_th">From</th>
            <th className="days_th">To</th>
            <th className="days_th">Status</th>
            <th className="days_th">Open / Closed</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, index) => (
            <tr key={index} style={{ marginBottom: "10px" }}>
              <td className="days_td">
                <strong>{day.day}:</strong>
              </td>

              <td className="days_td">
                {" "}
                <input
                  type="time"
                  id={`start-${index}`}
                  value={day.start}
                  onChange={(e) => {
                    updateDay(day.id, "start", e.target.value);
                  }}
                />
              </td>

              <td className="days_td">
                <input
                  type="time"
                  id={`end-${index}`}
                  value={day.end}
                  onChange={(e) => {
                    updateDay(day.id, "end", e.target.value);
                  }}
                />
              </td>

              <td className="days_td">{!day.is_working ? "Closed" : `Open`}</td>

              <td className="days_td">
                <input
                  type="checkbox"
                  id={`closed-${index}`}
                  checked={day.is_working}
                  onChange={(e) => {
                    updateDay(day.id, "is_working", e.target.checked);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
