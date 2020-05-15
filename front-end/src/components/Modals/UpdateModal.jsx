import React, { useState, Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { incrementDateBy30Days } from "../utils/date-manipulations";

export default function UpdateModal(props) {
  let { name, onApiCall, type } = props;
  const DEFAULT_EXPIRATION_DATE = incrementDateBy30Days();
  const DEFAULT_PRICE = 45;
  const [expDate, setExpDate] = useState(DEFAULT_EXPIRATION_DATE);
  const [price, setPrice] = useState(DEFAULT_PRICE);

  const types = {
    expense: "expense",
    workout: "workout",
    client: "client",
  };

  function updateMembership() {
    fetch("/api/update-membership", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        expirationDate: expDate,
        price,
      }),
    });
    onApiCall();
    props.onHide();
  }

  function updateWorkout() {}

  function updateExpense() {}

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
            ? `Update workout ${name}`
            : type === types.expense
            ? `Update expense ${name}`
            : ""}
          {type === types.client ? (
            <Fragment>
              <input
                defaultValue={DEFAULT_EXPIRATION_DATE}
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                className="ml-4"
                type="date"
              />{" "}
              <input
                defaultValue={DEFAULT_PRICE}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="ml-4"
                min={0}
                type="number"
              />
            </Fragment>
          ) : types.expense ? (
            <Fragment>
              <input
                defaultValue={DEFAULT_EXPIRATION_DATE}
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                className="ml-4"
                type="date"
              />{" "}
              <input
                defaultValue={DEFAULT_PRICE}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="ml-4"
                min={0}
                type="number"
              />
            </Fragment>
          ) : types.workout ? (
            <Fragment>
              <input
                defaultValue={DEFAULT_EXPIRATION_DATE}
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                className="ml-4"
                type="date"
              />{" "}
              <input
                defaultValue={DEFAULT_PRICE}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="ml-4"
                min={0}
                type="number"
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
