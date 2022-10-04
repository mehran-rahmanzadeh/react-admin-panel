import {Link} from "react-router-dom";
import React from "react";

const TextCard = (props) => {
    return <div className="col-xl-3 col-sm-6 mb-3">
        <div className="card text-white o-hidden h-100" style={{backgroundColor: 'rgba(7,71,166,0.88)'}}>
            <div className="card-body">
                <div className="card-body-icon">
                    <i className={"fa fa-fw " + props.icon}></i>
                </div>
                <div className="mr-5">{props.count} {props.parameter}</div>
            </div>
            <Link tag="a" className="card-footer text-white clearfix small z-1" to={props.href}>
                <span className="float-left">View Details</span>
                <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
            </Link>
        </div>
    </div>
}

export default TextCard;