import {Link} from "react-router-dom";
import React from "react";

const SidebarItem = (props) => {
    return <li className="mb-1">
        <Link tag="a" className="" to={props.href}>
            <i className={"fa " + props.icon}></i> {props.title}
        </Link>
    </li>
}

export default SidebarItem;