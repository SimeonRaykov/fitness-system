import React, { useState } from "react";
import incrementDateBy30Days from '../utils/date-manipulations';

export default function CreateCard() {
  const DEFAULT_MEMBERSHIP_PRICE = 45;
  const DEFAULT_EXPIRATION_DATE = incrementDateBy30Days();

  const [clientName, setClientName] = useState();
  const [price, setPrice] = useState(DEFAULT_MEMBERSHIP_PRICE);
  const [expirationDate, setExpirationDate] = useState(DEFAULT_EXPIRATION_DATE);

  function submitForm(e) {
    e.preventDefault();
    if (!clientName) {
      alert('Name required')
    }
    else {
      fetch("/api/create-membership", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          clientName: clientName,
          price: price,
          expirationDate: expirationDate
        })
      });
    }
  }

  return (
    <div className="container mt-2 mb-5">
      <h2>Create membership</h2>
      <form>
        <div class="form-group">
          <label for="client-name">Client name</label>
          <input
            required
            list="client"
            name="client"
            onChange={e => setClientName(e.target.value)}
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label className="mr-3" for="expDate">Expiration date</label>
          <input type="date" defaultValue={DEFAULT_EXPIRATION_DATE} onChange={e => setExpirationDate(e.target.value)} />
        </div>
        <div class="form-group">
          <label className="mr-3" for="price">Price</label>
          <input type="number" defaultValue={DEFAULT_MEMBERSHIP_PRICE} onChange={e => setPrice(e.target.value)} />
          <span> BGN</span>
        </div>
        <button className="btn btn-lg btn-primary" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
}