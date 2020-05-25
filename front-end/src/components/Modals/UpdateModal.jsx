import React, { useState, Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { incrementDateBy30Days } from "../utils/date-manipulations";
import notification from '../utils/toastify';

export default function UpdateModal(props) {
  let { name, type, id, date, link, amount } = props;
  const DEFAULT_EXPIRATION_DATE = incrementDateBy30Days();
  const DEFAULT_PRICE = 45;
  const [updateDate, setUpdateDate] = useState(date || DEFAULT_EXPIRATION_DATE);
  const [price, setPrice] = useState(amount || DEFAULT_PRICE);
  const [inputName, setInputName] = useState(name);
  const [workoutLink, setWorkoutLink] = useState(link);

  const types = {
    expense: "expense",
    workout: "workout",
    client: "client",
  };

  function updateMembership() {
    fetch(`/api/update-membership/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        date:updateDate,
        price,
      }),
    }).then(response=>response.json())
    .then(response=>{
      if(response.message && response.type){
        notification(response.type,response.message);  
      }
    });
    props.onHide();
  }

  function updateExpense() {
    fetch(`/api/update-expense/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name:inputName,
        price,
      }),
    }).then(response=>response.json())
    .then(response=>{
      if(response.message && response.type){
        notification(response.type,response.message);  
      }
    });
    props.onHide();
  }

  function updateWorkout()
   {
     fetch(`/api/update-workout/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name:inputName,
      link:workoutLink
    })
  }).then(response=>response.json())
  .then(response=>{
    if(response.message && response.type){
      notification(response.type,response.message);  
    }
  });
  props.onHide();}

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
            ? `Membership update for ${name}`
            : type === types.workout
            ? `Update workout ${name}`
            : type === types.expense
            ? `Update expense ${name}`
            : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Confirmation</h4>
        <p>
          {type === types.client
            ? `Membership update for ${name}`
            : type === types.workout
            ? `Update workout`
            : type === types.expense
            ? `Update expense`
            : ""}
          {type === types.client ? (
            <Fragment>
              <input
                defaultValue={updateDate}
                value={date}
                onChange={(e) => setUpdateDate(e.target.value)}
                className="ml-4"
                type="date"
              />{" "}
              <input
                defaultValue={DEFAULT_PRICE}
                value={amount}
                onChange={(e) => setPrice(e.target.value)}
                className="ml-4"
                min={0}
                type="number"
              />
            </Fragment>
          ) : type === types.expense ? (
            <Fragment>
              <input
                placeholder={name}
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="ml-4"
                type="text"
              />{" "}
              <input
                defaultValue={price}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="ml-4"
                min={0}
                type="number"
              />
            </Fragment>
          ) : type === types.workout ? (
            <Fragment>
              <input
                defaultValue={name}
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="ml-4"
                type="text"
              />{" "}
              <input
                defaultValue={link}
                value={workoutLink}
                onChange={(e) => setWorkoutLink(e.target.value)}
                className="ml-4"
                type="text"
              />
            </Fragment>
          ) : (
            ""
          )}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className="row justify-content-between">
          <Fragment>
            <button
              className="btn-primary btn-lg mr-5"
              onClick={
                type === types.client
                  ? updateMembership
                  : type === types.workout
                  ? updateWorkout
                  : type === types.expense
                  ? updateExpense
                  : ""
              }
            >
              Confirm
            </button>
            <button className="btn-success btn-lg mr-5" onClick={props.onHide}>
              Close
            </button>{" "}
          </Fragment>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
