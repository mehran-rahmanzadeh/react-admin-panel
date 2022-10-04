import React from "react";

const TableHead = (props) => {
    return <thead>
        <tr>
            {props.fields.map(field => {
                return <th key={field}>{field}</th>
            })}
        </tr>
    </thead>
}

export default TableHead;