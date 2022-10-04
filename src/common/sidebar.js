import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Link } from 'react-router-dom';
import {axiosInstance} from "../utils/axios";
import SidebarItem from "../components/SidebarItem";
import UserProfileDropDown from "../components/UserProfileDropDown";

class Sidebar extends React.Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    fetchUser = () => {
        axiosInstance.get("/api/v1/user/current/")
            .then(response => {
                let state = this.state
                state.sku = response.data.sku
                state.phoneNumber = response.data.phone_number
                state.firstName = response.data.first_name
                state.lastName = response.data.last_name
                state.isPhoneConfirmed = response.data.is_phone_confirmed
                state.dateJoined = response.data.date_joined
                this.setState(state)
            })
            .catch(err => {console.log(err.message)})
    }

    componentDidMount() {
        this.fetchUser()
    }

    render(){
        return <div className="border-end sidenav" id="sidebar-wrapper">
            <div className="sidebar-heading border-bottom ">
                <Link to="/">
                    <img alt="Alt content" width="30px" height="30px" src={require('./../assets/images/contacts-address-book-logo.png')} />
                    <span className="m-1">Phonebook</span>
                </Link>
            </div>

            <PerfectScrollbar className="sidebar-items">
                <ul className="list-unstyled ps-0">
                    <SidebarItem href={"/"} icon={"fa-dashboard"} title={"Dashboard"}></SidebarItem>
                    <li className="border-top my-3"></li>
                    <SidebarItem href={"/contacts"} icon={"fa-child"} title={"Contacts"} />
                    <SidebarItem href={"/groups"} icon={"fa-group"} title={"Groups"} />
                    <SidebarItem href={"/login"} icon={"fa-sign-out"} title={"Logout"} />
                </ul>
            </PerfectScrollbar>

            <UserProfileDropDown firstName={this.state.firstName} lastName={this.state.lastName} />
        </div>
    }
}

export default Sidebar;