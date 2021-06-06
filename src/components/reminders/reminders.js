import React from "react";
import {Link} from "react-router-dom";
import logo from "../../icons/logo.svg";
import plusIcon from "../../icons/plus.svg";

// import css files here
import "../../reminder.css";

const DB_KEY = "reminders";

const getReminder = () => {
  const storedReminders = JSON.parse(localStorage.getItem(DB_KEY));

  return storedReminders || [];
};

const getReminderFormattedDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true };
  const reminderDate = new Date(date);

  try {
    return reminderDate.toLocaleString("en-US", options);
  } catch(e) {
    return date;
  }

}

export default function Reminders() {
  const reminders = getReminder();

  return (
    <div className="padding-default container">
      <div className="display-flex justify-flex-end">
        <img src={logo} alt="Reminder logo" style={{width: "50px", height: "50px"}}/>
      </div>
      <h1>Reminders</h1>
      <div>
        {reminders.map((reminder) => {
          return (
            <div className="reminder-card" key={reminder.id} style={{background: reminder.reminderColor || "white"}}>
              <div className="font-24 font-bold">{reminder.title}</div>
              <div className="font-20 padding-row-small">{reminder.description}</div>
              <div className="border-grey reminder-date">{getReminderFormattedDate(reminder.remindDate)}</div>
            </div>
          )
        })}
        {!reminders.length && (
          <h2 style={{margin: "100px 50px 50px 50px"}}>Click on Plus icon to create new Reminder</h2>
        )}
      </div>
      <Link exact="true" to="/create" title="Create Reminder" className="create-btn">
        <img src={plusIcon} alt="create reminder" style={{width: "25px", height: "25px"}}/>
      </Link>
    </div>
  );
}