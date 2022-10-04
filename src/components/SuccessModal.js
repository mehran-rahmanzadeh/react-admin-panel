import {Button, Modal} from "react-bootstrap";
import React from "react";

const SuccessModal = (props) => {
    return <Modal
        show={props.isModalOpen} onHide={props.onHide} size="lg"
        aria-labelledby="contained-modal-title-vcenter" keyboard={true} centered>
        <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={"alert alert-success m-2"} role="alert">
                {props.message}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onCloseClick}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
}

export default SuccessModal;