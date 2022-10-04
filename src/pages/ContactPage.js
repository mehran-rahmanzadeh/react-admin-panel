import React from "react";
import adminLayout from "../hoc/adminLayout";
import {axiosInstance} from "../utils/axios";
import DeleteModal from "../components/DeleteModal";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import Breadcrumb from "../components/Breadcrumb";
import TableHead from "../components/TableHead";
import ContactTableBody from "../components/ContactTableBody";
import Pagination from "../components/Pagination";

class ContactPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            contacts: [],
            url: "/api/v1/contact/?limit=5&offset=0",
            nextURL: null,
            previousURL: null,
            tmpAddContact: {},
            tmpAddContactToGroup: {},
            isDeleteModalOpen: false,
            isSuccessModalOpen: false,
            isErrorModalOpen: false,
            tmpDeleteContactSKU: null,
            dropDownContacts: [],
            dropDownGroups: []
        };
    }

    fetchContacts = () => {
        axiosInstance.get(this.state.url)
            .then(response => {
                let state = this.state
                state.contacts = response.data.results
                state.nextURL = response.data.next
                state.previousURL = response.data.previous
                this.setState(state)
            })
            .catch(err => {console.log(err.message)})
    }

    fetchDropDownContacts = () => {
        axiosInstance.get("/api/v1/contact/")
            .then(response => {
                let state = this.state
                state.dropDownContacts = response.data.results
                this.setState(state)
            })
            .catch(err => {console.log(err.message)})
    }

    fetchDropDownGroups = () => {
        axiosInstance.get("/api/v1/group/")
            .then(response => {
                let state = this.state
                state.dropDownGroups = response.data.results
                this.setState(state)
            })
            .catch(err => {console.log(err.message)})
    }

    componentDidMount() {
        this.fetchContacts()
        this.fetchDropDownContacts()
        this.fetchDropDownGroups()
    }

    getPhoneNumbersDisplay = (phoneNumbers) => {
        let text = ""
        phoneNumbers.map(phoneNumber => {
            text += phoneNumber.value + ", "
        })
        return text
    }

    handleNextPage = () => {
        if (this.state.nextURL) {
            let state = this.state
            state.url = state.nextURL
            this.setState(state)
            this.fetchContacts()
        }
    }

    handlePreviousPage = () => {
        if (this.state.previousURL) {
            let state = this.state
            state.url = state.previousURL
            this.setState(state)
            this.fetchContacts()
        }
    }

    handleNameChange = (event) => {
        let state = this.state
        state.tmpAddContact.name = event.target.value
        this.setState(state)
    }

    handleEmailChange = (event) => {
        let state = this.state
        state.tmpAddContact.email = event.target.value
        this.setState(state)
    }

    handlePhoneNumbersChange = (event) => {
        let state = this.state
        state.tmpAddContact.phone_numbers = event.target.value.split(",")
        this.setState(state)
    }

    handleContactChange = (event) => {
        let state = this.state
        state.tmpAddContactToGroup.contact = event.target.value
        this.setState(state)
    }

    handleGroupChange = (event) => {
        let state = this.state
        state.tmpAddContactToGroup.group = event.target.value
        this.setState(state)
    }

    handleDeleteContactSKUChange = (sku) => {
        let state = this.state
        state.tmpDeleteContactSKU = sku
        state.isDeleteModalOpen = true
        this.setState(state)
    }

    handleAddContact = (event) => {
        axiosInstance.post("/api/v1/contact/", this.state.tmpAddContact)
            .then(response => {
                this.fetchContacts()
                let state = this.state
                state.isSuccessModalOpen = true
                this.setState(state)
            })
            .catch(err => {
                console.log("here")
                let state = this.state
                state.isErrorModalOpen = true
                this.setState(state)
            })
        event.preventDefault()
        event.target.reset()
    }

    handleAddContactToGroup = (event) => {
        const payload = {group: this.state.tmpAddContactToGroup.group}
        axiosInstance.post(`/api/v1/contact/${this.state.tmpAddContactToGroup.contact}/add_to_group/`, payload)
            .then(response => {
                let state = this.state
                state.isSuccessModalOpen = true
                this.setState(state)
            })
            .catch(err => {
                let state = this.state
                state.isErrorModalOpen = true
                this.setState(state)
            })
        event.preventDefault()
        event.target.reset()
    }

    handleDeleteContact = (sku) => {
        axiosInstance.delete(`/api/v1/contact/${sku}/`)
            .then(response => {
                this.fetchContacts()
                let state = this.state
                state.isDeleteModalOpen = false
                this.setState(state)
            })
            .catch(err => {console.log(err.message)})
    }

    render(){
        return (
            <>
                <DeleteModal isModalOpen={this.state.isDeleteModalOpen} onHide={() => {
                    let state = this.state
                    state.isDeleteModalOpen = !this.state.isDeleteModalOpen
                    this.setState(state)
                }} message={"Are you sure you want to delete contact?"} onCloseClick={() => {
                    let state = this.state
                    state.isDeleteModalOpen = !this.state.isDeleteModalOpen
                    this.setState(state)
                }} onDeleteClick={() => {
                    this.handleDeleteContact(this.state.tmpDeleteContactSKU)
                }} />

                <SuccessModal isModalOpen={this.state.isSuccessModalOpen} onHide={() => {
                    let state = this.state
                    state.isSuccessModalOpen = !this.state.isSuccessModalOpen
                    this.setState(state)
                }} message={"Successfully applied!"} onCloseClick={() => {
                    let state = this.state
                    state.isSuccessModalOpen = !this.state.isSuccessModalOpen
                    this.setState(state)
                }} />

                <ErrorModal isModalOpen={this.state.isErrorModalOpen} onHide={() => {
                    let state = this.state
                    state.isErrorModalOpen = !this.state.isErrorModalOpen
                    this.setState(state)
                }} message={"Failed!"} onCloseClick={() => {
                    let state = this.state
                    state.isErrorModalOpen = !this.state.isErrorModalOpen
                    this.setState(state)
                }} />

            <div className="table-container">

                <div className="row">
                    <Breadcrumb pages={["Home"]} activePage={"Contacts"} />
                    <div className="col">
                        <h5 className="pb-2 mb-0">Contacts</h5>
                    </div>
                </div>

                <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                </p>

                <div className="d-flex text-muted">
                    <table className="table">
                        <TableHead fields={["SKU", "Name", "Email", "Phone numbers", "Created on", "Updated on", "Action"]} />
                        <ContactTableBody contacts={this.state.contacts} phoneNumbersDisplay={this.getPhoneNumbersDisplay} onDeleteClick={this.handleDeleteContactSKUChange} />
                    </table>
                </div>

                <Pagination
                    onNext={this.handleNextPage}
                    onPrevious={this.handlePreviousPage}
                    isNextDisabled={this.state.nextURL === null}
                    isPreviousDisabled={this.state.previousURL === null}/>
            </div>
        
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h6 className="border-bottom pb-2 mb-0">Actions</h6>
                <section id="forms">
                    <article className="my-3" id="overview">
                    <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
                        <h3>Add new contact</h3>
                        <p className="d-flex align-items-center">Submit your new contact info</p>
                    </div>
                        <div className="bd-example">
                            <form onSubmit={this.handleAddContact} id="add-contact-form">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputName1" className="form-label">Name</label>
                                    <input type="text" onChange={this.handleNameChange} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
                                    <div id="nameHelp" className="form-text">The name of your new contact</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" onChange={this.handleEmailChange} className="form-control" id="exampleInputEmail1" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPhoneNumbers1" className="form-label">Phone Numbers</label>
                                    <input type="text" onChange={this.handlePhoneNumbersChange} className="form-control" id="exampleInputPhoneNumbers1" aria-describedby="phoneHelp" />
                                    <div id="phoneHelp" className="form-text">Separate multiple phone numbers using ","</div>
                                </div>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </article>
                    <h6 className="border-bottom pb-2 mb-0"></h6>
                    <article className="my-3" id="disabled-forms">
                    <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
                        <h3>Add contact to group</h3>
                        <p className="d-flex align-items-center">Add existing contact to group</p>
                    </div>

                    <div>
                        <div className="bd-example">
                        <form onSubmit={this.handleAddContactToGroup} id="add-contact-to-group-form">
                            <div className="mb-3">
                                <label htmlFor="disabledSelect" className="form-label">Contact</label>
                                <select id="contactSelect" onChange={this.handleContactChange} className="form-select">
                                    <option disabled selected value> -- select an option -- </option>
                                    {this.state.dropDownContacts.map(contact => {
                                        return <option key={contact.sku} value={contact.sku}>{contact.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="disabledSelect" className="form-label">Group</label>
                                <select id="groupSelect" onChange={this.handleGroupChange} className="form-select">
                                    <option disabled selected value> -- select an option -- </option>
                                    {this.state.dropDownGroups.map(group => {
                                        return <option key={group.sku} value={group.sku}>{group.title}</option>
                                    })}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                        </div>
                    </div>
                    </article>
                </section>
            </div>
            </>
          );
    }
}

export default adminLayout(ContactPage);