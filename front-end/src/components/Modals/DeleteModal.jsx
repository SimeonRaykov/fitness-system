import React, { useState, Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { incrementDateBy30Days } from "../utils/date-manipulations";
import notification from '../utils/toastify';

export default function DeleteModal(props) {
  let { name, type, id } = props;
  const DEFAULT_EXPIRATION_DATE = incrementDateBy30Days();
  const DEFAULT_PRICE = 45;
  const [expDate, setExpDate] = useState(DEFAULT_EXPIRATION_DATE);
  const [price, setPrice] = useState(DEFAULT_PRICE);

  const types = {
    expense: "expense",
    workout: "workout",
    client: "client",
  };

  function deleteClient() {
    fetch(`/api/clients/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    })
    .then(response=>response.json())
  .then(response=>{
    if(response.message && response.type){
      notification(response.type,response.message);  
    }
  });
    props.onHide();
  }

  function deleteExpense() {
    fetch(`/api/expense/${name}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    }).then(response=>response.json())
    .then(response=>{
      if(response.message && response.type){
        notification(response.type,response.message);  
      }
    });
    props.onHide();
  }

  function deleteWorkout() {
    fetch(`/api/workout/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    }).then(response=>response.json())
    .then(response=>{
      if(response.message && response.type){
        notification(response.type,response.message);  
      }
    });
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
          {type === types.client
            ? "Delete client"
            : type === types.expense
            ? `Delete expense ${name}`
            : type === types.workout
            ? `Delete workout ${name}`
            : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Confirmation</h4>
        <p>
          Are you sure you want to delete {type} {name}?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className="row justify-content-between">
          <Fragment>
            <button
              className="btn-danger btn-lg mr-5"
              onClick={
                type === types.client
                  ? deleteClient
                  : type ===types.expense
                  ? deleteExpense
                  : type === types.workout
                  ? deleteWorkout
                  : ""
              }
            >
              Yes
            </button>
            <button className="btn-success btn-lg mr-5" onClick={props.onHide}>
              No
            </button>
          </Fragment>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
