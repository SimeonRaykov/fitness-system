import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { incrementDateBy30Days } from "../utils/date-manipulations";
import notification from '../utils/toastify';

export default function CreateCard() {
  const DEFAULT_MEMBERSHIP_PRICE = 45;
  const DEFAULT_EXPIRATION_DATE = incrementDateBy30Days();

  const [clientName, setClientName] = useState();
  const [price, setPrice] = useState(DEFAULT_MEMBERSHIP_PRICE);
  const [expirationDate, setExpirationDate] = useState(DEFAULT_EXPIRATION_DATE);

  function submitForm(e) {
    e.preventDefault();
    if (!clientName) {
      alert("Name required");
    } else {
      fetch("/api/create-membership", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          clientName: clientName,
          price: price,
          expirationDate: expirationDate,
        }),
      }).then(response=>response.json())
      .then(response=>{
        if(response.message && response.type){
          notification(response.type,response.message);  
        }
      });
    }
  }

  return (
    <div className="container mt-5">
      <Card style={{ width: "50%", margin: "auto" }}>
        <h2>Create membership</h2>
        <hr/>
        <form>
          <div class="form-group">
            <label for="client-name">Client name</label>
            <input
              required
              list="client"
              name="client"
              onChange={(e) => setClientName(e.target.value)}
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="expiration date">Expiration date</label>
            <input
              name="expiration-date"
              class="form-control"
              type="date"
              defaultValue={DEFAULT_EXPIRATION_DATE}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label className="mr-3" for="price">
              Price BGN
            </label>
            <input
              name="price"
              class="form-control"
              type="number"
              defaultValue={DEFAULT_MEMBERSHIP_PRICE}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button className="btn btn-lg btn-primary mb-3" onClick={submitForm}>
            Create
          </button>
        </form>
      </Card>
    </div>
  );
}
