import React from "react";

const Breadcrumb = (props) => {
    return <div>
        <div className="bd-example">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {props.pages.map(title => {
                        return <li key={title} className="breadcrumb-item"><a href="#">{title}</a></li>})}
                    {(props.activePage !== undefined) &&
                        <li className="breadcrumb-item active" aria-current="page">{props.activePage}</li>}
                </ol>
            </nav>
        </div>
    </div>
}

export default Breadcrumb;