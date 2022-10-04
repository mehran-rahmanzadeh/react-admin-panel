import {Link} from "react-router-dom";
import React from "react";

const UserProfileDropDown = (props) => {
    return <div className="dropdown fixed-bottom-dropdown">
        <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={`https://ui-avatars.com/api/?background=random&name=${props.firstName} ${props.lastName}`}
                 alt={props.firstName + " " + props.lastName}
                 width="32" height="32" className="rounded-circle me-2" />
            <span style={{fontSize: 11}}>{props.firstName} {props.lastName}</span>
        </a>
        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><Link className="dropdown-item" to="/profile"><i className="fa fa-user-circle" aria-hidden="true"></i> Profile</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="/login"><i className="fa fa-sign-out" aria-hidden="true"></i> Sign out</Link></li>
        </ul>
    </div>
}

export default UserProfileDropDown;