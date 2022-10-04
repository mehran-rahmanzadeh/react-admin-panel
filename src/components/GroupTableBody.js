import React from "react";

const GroupTableBody = (props) => {
    return <tbody>
        {props.groups.map(group => {
            return <tr key={group.sku + "row"}>
                <td key={group.sku}>{group.sku}</td>
                <td key={group.sku + "title"}>{group.title}</td>
                <td key={group.sku + "contacts"}>{props.contactsDisplay(group.contacts)}</td>
                <td key={group.sku + "created"}>{group.created}</td>
                <td key={group.sku + "modified"}>{group.modified}</td>
                <td key={group.sku + "btn"}>
                    <button onClick={() => {props.onDeleteClick(group.sku)}} className="btn btn-primary btn-sm" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false">Delete</button>
                </td>
            </tr>
        })}
        </tbody>
}

export default GroupTableBody;