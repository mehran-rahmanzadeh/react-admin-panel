import React from "react";
import adminLayout from "../hoc/adminLayout"
import {axiosInstance} from "../utils/axios";
import DeleteModal from "../components/DeleteModal";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import Breadcrumb from "../components/Breadcrumb";
import TableHead from "../components/TableHead";
import GroupTableBody from "../components/GroupTableBody";
import Pagination from "../components/Pagination";

class GroupPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            groups: [],
            url: "/api/v1/group/?limit=5&offset=0",
            tmpDeleteGroupSKU: null,
            isSuccessModalOpen: false,
            isDeleteModalOpen: false,
            isErrorModalOpen: false,
            tmpAddGroup: {}
        }
    }

    fetchGroups = () => {
        axiosInstance.get(this.state.url)
            .then(response => {
                let state = this.state
                state.groups = response.data.results
                state.nextURL = response.data.next
                state.previousURL = response.data.previous
                this.setState(state)
            })
            .catch(err => {console.log(err.message)})
    }

    handleNextPage = () => {
        if (this.state.nextURL) {
            let state = this.state
            state.url = state.nextURL
            this.setState(state)
            this.fetchGroups()
        }
    }

    handlePreviousPage = () => {
        if (this.state.previousURL) {
            let state = this.state
            state.url = state.previousURL
            this.setState(state)
            this.fetchGroups()
        }
    }

    componentDidMount() {
        this.fetchGroups()
    }

    handleDeleteGroupSKUChange = (sku) => {
        let state = this.state
        state.tmpDeleteGroupSKU = sku
        state.isDeleteModalOpen = true
        this.setState(state)
    }

    handleDeleteGroup = (sku) => {
        axiosInstance.delete(`/api/v1/group/${sku}/`)
            .then(response => {
                this.fetchGroups()
                let state = this.state
                state.isDeleteModalOpen = false
                this.setState(state)
            })
            .catch(err => {console.log(err.message)})
    }

    handleAddGroup = (event) => {
        axiosInstance.post(`/api/v1/group/`, this.state.tmpAddGroup)
            .then(response => {
                this.fetchGroups()
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

    handleTitleChange = (event) => {
        let state = this.state
        state.tmpAddGroup.title = event.target.value
        this.setState(state)
    }

    getContactsDisplay = (contacts) => {
        let text = ""
        contacts.map(contact => {
            text += contact.name + ", "
        })
        return text
    }

    render(){
        return (
            <>
                <DeleteModal isModalOpen={this.state.isDeleteModalOpen} onHide={() => {
                    let state = this.state
                    state.isDeleteModalOpen = !this.state.isDeleteModalOpen
                    this.setState(state)
                }} message={"Are you sure you want to delete group?"} onCloseClick={() => {
                    let state = this.state
                    state.isDeleteModalOpen = !this.state.isDeleteModalOpen
                    this.setState(state)
                }} onDeleteClick={() => {
                    this.handleDeleteGroup(this.state.tmpDeleteGroupSKU)
                }}/>

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
                    <Breadcrumb pages={["Home"]} activePage={"Groups"} />
                    <div className="col">
                        <h5 className="pb-2 mb-0">Groups</h5>
                    </div>
                </div>

                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                </p>

                <div className="d-flex text-muted">
                    <table className="table">
                        <TableHead fields={["SKU", "Title", "Contacts", "Created on", "Updated on", "Action"]} />
                        <GroupTableBody groups={this.state.groups} contactsDisplay={this.getContactsDisplay} onDeleteClick={this.handleDeleteGroupSKUChange} />
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
                            <h3>Add new group</h3>
                            <p className="d-flex align-items-center">Submit your new group info</p>
                        </div>
                        <div className="bd-example">
                            <form onSubmit={this.handleAddGroup}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputName1" className="form-label">Title</label>
                                    <input onChange={this.handleTitleChange} type="text" className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
                                    <div id="nameHelp" className="form-text">The title of your new group</div>
                                </div>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </article>
                </section>
            </div>
        </>);
    }
}

export default adminLayout(GroupPage);