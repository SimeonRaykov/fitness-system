import React, { useState, useEffect } from "react";
import { Card, Jumbotron } from "react-bootstrap";
import { LoadingSpinner } from "../index";
import { UpdateModal, DeleteModal } from "../index";
import notification from "../utils/toastify";
const nth_occurrence = require("../utils/nth_occurrence");

export default function Client() {
  const type = "client";
  const clientName = getClientName();
  const [clientID, setClientID] = useState();
  const [clientData, setClientData] = useState([]);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  useEffect(() => {
    getClientData();
  }, []);

  useEffect(() => {
    getClientData();
  }, [handleClientDelete, handleClientUpdate]);

  function handleClientDelete() {
    notification("success", "Client deleted");
  }

  function handleClientUpdate() {
    notification("success", "Membership updated");
  }

  function updateClient() {
    setUpdateModalShow(true);
  }

  function deleteClient() {
    setDeleteModalShow(true);
  }

  async function getClientData() {
    await fetch(`/api/clients/${clientName}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        if (response && response.length) {
          setClientData(response[0]);
        } else {
          setClientData();
        }
      })
      .catch((err) => console.log(err));
  }

  function getClientName() {
    const fourthInclineIndex = nth_occurrence(window.location.href, "/", 4);
    return decodeURI(window.location.href.substr(fourthInclineIndex + 1));
  }
  if (clientData == "") {
    return <LoadingSpinner />;
  }
  if (!clientData) {
    return (
      <Jumbotron>
        <h2>Client {clientName} not found!</h2>
      </Jumbotron>
    );
  }
  return (
    <div className="container mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Client : {clientData.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            ID: {clientData.id}
          </Card.Subtitle>
          <Card.Text>Total money transfered: {clientData.money_transfered}</Card.Text>
          <Card.Text>Membership expiration date: {clientData.membership_valid}</Card.Text>
          <Card.Text>Membership status: {new Date(clientData.membership_valid) >= new Date()?'Valid':'Expired'}</Card.Text>
          <div className="row justify-content-center">
            <button className="btn btn-primary" onClick={() => updateClient()}>
              Update membership
            </button>
            <button className="btn btn-danger" onClick={() => deleteClient()}>
              Delete client
            </button>
          </div>
        </Card.Body>
      </Card>
      <UpdateModal
        type={type}
        show={updateModalShow}
        name={clientData.name}
        id={clientData.id}
        onApiCall={handleClientUpdate}
        onHide={() => setUpdateModalShow(false)}
      />
      <DeleteModal
        type={type}
        show={deleteModalShow}
        name={clientData.name}
        id={clientData.id}
        onApiCall={handleClientDelete}
        onHide={() => setDeleteModalShow(false)}
      />
    </div>
  );
}
