import React, { useState, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import incrementDateBy30Days from '../utils/date-manipulations';

export default function VerticallyCenteredModal(props) {
    let { clientName, onApiCall, type } = props;
    const DEFAULT_EXPIRATION_DATE = incrementDateBy30Days();
    const DEFAULT_PRICE = 45;
    const [expDate, setExpDate] = useState(DEFAULT_EXPIRATION_DATE);
    const [price, setPrice] = useState(DEFAULT_PRICE);
    const types = { DELETE: 'delete', UPDATE: 'update' };

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
        onApiCall();
        props.onHide();
    }

    function updateMembership() {
        fetch("/api/clients/update-membership", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                clientName,
                expirationDate: expDate,
                price
            })
        });
        onApiCall();
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
                    {type === types.DELETE ? 'Delete client' : type === types.UPDATE ? `Membership update for ${clientName}` : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Confirmation</h4>
                <p>
                    {type === types.DELETE ? 'Client deletion' : type === types.UPDATE ? `Membership update` : ` Are you sure that you want to delete client ${clientName}?`}
                    {type === types.UPDATE ? <Fragment><input defaultValue={DEFAULT_EXPIRATION_DATE} value={expDate} onChange={e=>setExpDate(e.target.value)} className="ml-4" type="date" /> <input defaultValue={DEFAULT_PRICE} value={price} onChange={e => setPrice(e.target.value)} className="ml-4" min={0} type="number" /></Fragment> : ''}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <div className="row justify-content-between">
                    {type === types.DELETE ? <Fragment><button className="btn-danger btn-lg mr-5" onClick={deleteClient}>Yes</button>
                        <button className="btn-success btn-lg mr-5" onClick={props.onHide}>No</button> </Fragment> : <Fragment><button className="btn-primary btn-lg mr-5" onClick={updateMembership}>Confirm</button>
                            <button className="btn-success btn-lg mr-5" onClick={props.onHide}>Close</button> </Fragment>}
                </div>
            </Modal.Footer>
        </Modal>
    );
}