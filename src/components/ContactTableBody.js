import React from "react";

const ContactTableBody = (props) => {
    return <tbody>
        {props.contacts.map(contact => {
            return <tr key={contact.sku + "row"}>
                <td key={contact.sku}>{contact.sku}</td>
                <td key={contact.sku + "name"}>{contact.name}</td>
                <td key={contact.sku + "email"}>{contact.email}</td>
                <td key={contact.sku + "phoneNumbers"}>{props.phoneNumbersDisplay(contact.phone_numbers)}</td>
                <td key={contact.sku + "created"}>{contact.created}</td>
                <td key={contact.sku + "modified"}>{contact.modified}</td>
                <td key={contact.sku + "btn"}>
                    <button onClick={() => {props.onDeleteClick(contact.sku)}} className="btn btn-primary btn-sm" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false">Delete</button>
                </td>
            </tr>
        })}
        </tbody>
}

export default ContactTableBody;