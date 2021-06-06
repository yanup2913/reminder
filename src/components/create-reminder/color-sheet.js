import React, {useEffect, useState} from "react";


const REMINDER_COLORS = [
    "white",
    "#ffa447",
    "#7ecbff",
    "#ffa6c4",
    "#20cbc3",
    "#ffa4a3",
];

export default function BottomColorSheet({onReminderColorChange, defaultSelectedColor="white"}) {
    const [selectedColor, setSelectedColor] = useState(defaultSelectedColor);

    useEffect(() => {
        if(typeof onReminderColorChange === "function") {
            onReminderColorChange(selectedColor);
        }
    }, [selectedColor, onReminderColorChange]);

    const onColorChange = (color) => {
        if(color !== selectedColor) {
            setSelectedColor(color);
        }
    }

    return (
      <div className="display-flex align-center justify-space-around">
          {REMINDER_COLORS.map((color, index) => (
                <div
                    style={{background: color}}
                    key={index}
                    className={
                        "padding-default margin-right-default relative border-light-grey border-radius-normal" +
                        (!index ? " margin-left-default" : "")
                    }
                    onClick={onColorChange.bind(null, color)}
                >
                    {color === selectedColor && (
                        <svg
                            className="check-mark"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="20"
                            height="20"
                            role="img"
                        >
                            <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                        </svg>
                    )}
                </div>
          ))}
      </div>
    )
  }