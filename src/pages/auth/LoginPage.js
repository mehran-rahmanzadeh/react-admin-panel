import React from "react";
import "../../assets/css/login.css"
import authLayout from "../../hoc/authLayout";
import {Button, Modal} from "react-bootstrap";
import {axiosInstance} from "../../utils/axios";

class LoginPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {isModalOpen: false};
    }

    componentDidMount() {
        localStorage.removeItem("access")
    }

    handlePhoneChange = (event) => {
        // set email value to state
        let state = this.state
        state.phoneNumber = event.target.value
        this.setState(state)
    }

    handlePasswordChange = (event) => {
        // set password value to state
        let state = this.state
        state.password = event.target.value
        this.setState(state)
    }

    handleLoginSubmit = (event) => {
        // prevent default and call API
        // if success store token in localstorage
        // otherwise show an error in modal
        const payload = {
            phone_number: this.state.phoneNumber,
            password: this.state.password
        }
        axiosInstance.post("/api/v1/token/create/", payload)
            .then(response => {
                const access = response.data.access
                console.log(response.data)
                localStorage.setItem("access", access)
                // TODO: show success modal
                document.location.replace("/")
            })
            .catch(err => {
                let state = this.state
                state.isModalOpen = true
                this.setState(state)
            })
        event.preventDefault()
    }

    render(){
        return <>
            <Modal
                show={this.state.isModalOpen}
                onHide={() => {
                    let state = this.state
                    state.isModalOpen = !this.state.isModalOpen
                    this.setState(state)
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                keyboard={true}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"alert alert-danger m-2"} role="alert">
                        Phone number or password is incorrect
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        let state = this.state
                        state.isModalOpen = !this.state.isModalOpen
                        this.setState(state)
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <form className="login-form">
                <div className="d-flex align-items-center my-4">
                    <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
                </div>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Phone number</label>
                    <input type="text" required={true} onChange={this.handlePhoneChange} id="form3Example3" className="form-control form-control-lg"
                    placeholder="Enter a valid email address" />
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                    <input type="password" required={true} onChange={this.handlePasswordChange} id="form3Example4" className="form-control form-control-lg"
                    placeholder="Enter password" />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    {/* <!-- Checkbox --> */}
                    <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3">
                        Remember me
                    </label>
                    </div>
                    {/*<Link to="/reset-password" className="text-body">Forgot password?</Link>*/}
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                    <button onClick={this.handleLoginSubmit} className="btn btn-primary btn-lg">Login</button>
                    {/*<p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"*/}
                    {/*    className="link-danger">Register</a></p>*/}
                </div>
            </form>
        </>
    }
}

export default authLayout(LoginPage);