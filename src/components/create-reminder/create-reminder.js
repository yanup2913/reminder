import TextareaAutosize from "react-textarea-autosize";
import React, {useState, useRef} from "react";
import Header from "./header";
import BottomColorSheet from "./color-sheet";
import DatePicker from "react-datepicker";
import { useAlert } from "react-alert";
import uniqid from "uniqid";

// import css files here
import '../../reminder.css';
import "react-datepicker/dist/react-datepicker.css";

const DEFAULT_COLOR = "white";
const DB_KEY = "reminders";

const getMaxTime = (date) => {
  date.setHours(23, 59);

  return date;
};

const getMinTime = (date) => {
  date.setMinutes(date.getMinutes() + 1)

  return date;
};

export default function CreateReminder() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [remindDate, setRemindDate] = useState(new Date());
  
  const [reminderColor, setReminderColor] = useState(DEFAULT_COLOR);

  const isLoading = useRef(false);

  const alert = useAlert()

  const onTitleChange = ev => {
    let value = ev.target.value;
    value = value.replace(/[\r\n]+/g, " ");

    setTitle(value);
  }

  const onDescriptionChange = ev => {
    const value = ev.target.value;

    setDescription(value);
  }

  const onDateChange = (date) => {
    const updatedDate = new Date(date);

    updatedDate.setSeconds(0, 0);

    setRemindDate(updatedDate);
  }

  const validateResponse = () => {
    if(!title) {
      alert.error("Please Enter Some Title");
      return false;
    } else if(!description) {
      alert.error("Please Enter Some Description");
      return false;
    } else if(!remindDate) {
      alert.error("Please Enter Reminder date & time");
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if(validateResponse() && !isLoading.current) {
      isLoading.current = true;
      const storedReminders = JSON.parse(localStorage.getItem(DB_KEY)) || [];
      const createdReminder = {title, description, remindDate, id: uniqid(), reminderColor};
      console.log({createdReminder});
      storedReminders.unshift(createdReminder);

      localStorage.setItem(DB_KEY, JSON.stringify(storedReminders));

      const callback = () => {
        isLoading.current = false;
        window.location.href="/";
      }
      const event = new CustomEvent('schedule_notification', { detail: {...createdReminder, callback} });
      window.dispatchEvent(event);
    } else if(isLoading.current) {
      alert.show("Wait till the process complete");
    }
  }

  return (
    <div className="padding-default container height-100vh" style={{background: reminderColor}}>
      <Header/>
      <TextareaAutosize
        placeholder="Reminder a title"
        className="width-100 outline-none border-none no-resize font-24 font-22-xs font-bold margin-bottom-small background-transparent"
        maxRows="3"
        autoFocus
        onChange={onTitleChange}
        value={title}
        maxLength={50}
      />
      <TextareaAutosize
        placeholder="Reminder description"
        className="width-100 outline-none border-none no-resize font-20 background-transparent"
        minRows="5"
        maxRows="10"
        onChange={onDescriptionChange}
        value={description}
        maxLength={150}
      />
      <DatePicker
        selected={remindDate}
        onChange={onDateChange}
        minDate={new Date()}
        minTime={getMinTime(new Date())}
        maxTime={getMaxTime(new Date())}
        showTimeSelect
        withPortal
        dateFormat="MMMM d, yyyy h:mm aa"
        timeFormat="HH:mm"
        timeIntervals={1}
        isClearable
        className="padding-default width-100 font-20 border-none date-picker background-transparent"
        placeholderText="Select Reminder Time"
      />
      <div className="bottom-sheet">
        <BottomColorSheet
          onReminderColorChange={setReminderColor}
        />
      </div>
      <div className="bottom-save-button">
        <SaveButton {...{onSubmit}}/>
      </div>
    </div>
  );
}

function SaveButton({onSubmit}) {
  return (
    <div className="save-btn" onClick={onSubmit}>
      <svg
        className=""
        viewBox="0 0 16 16"
        version="1.1"
        width="20"
        height="20"
        role="img"
      >
        <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
      </svg>
    </div>
  )
}

