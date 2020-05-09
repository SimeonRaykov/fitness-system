import React from 'react';
import { Modal, Button } from 'react-bootstrap';


export default function VerticallyCenteredModal(props) {
    let { clientName, onClientDeletion } = props;

    function deleteClient() {
        fetch("/api/clients/delete", {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                clientName,
            })
        });
        onClientDeletion();
        props.onHide();
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Client deletion
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Confirmation</h4>
                <p>
                    Are you sure that you want to delete client {clientName}?
          </p>
            </Modal.Body>
            <Modal.Footer>
                <div className="row justify-content-between">
                    <button className="btn-danger btn-lg mr-5" onClick={deleteClient}>Yes</button>
                    <button className="btn-success btn-lg mr-5" onClick={props.onHide}>No</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}