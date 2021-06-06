import {Link} from "react-router-dom";
import backIcon from "../../icons/back.svg";

export default function Header() {
    return (
        <div className="padding-row-default">
            <Link exact={"true"} to="/" title="Go reminders">
                <img src={backIcon} alt="Back Icon" style={{width: "20px", height: "20px"}}/>
            </Link>
        </div>
    )
}