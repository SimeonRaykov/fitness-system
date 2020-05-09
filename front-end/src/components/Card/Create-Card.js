import React, { useState } from "react";

export default function CreateCard() {
  const DEFAULT_MEMBERSHIP_PRICE = 45;
  const DEFAULT_EXPIRATION_DATE = incrementDateBy30Days();

  const [clientName, setClientName] = useState();
  const [price, setPrice] = useState(DEFAULT_MEMBERSHIP_PRICE);
  const [expirationDate, setExpirationDate] = useState(DEFAULT_EXPIRATION_DATE);

  function incrementDateBy30Days() {
    const today = new Date();
    const incrementedDate = new Date(today.setMonth(today.getMonth() + 1));
    return `${incrementedDate.getFullYear()}-${incrementedDate.getMonth() + 1 < 10 ? `0${incrementedDate.getMonth() + 1}` : incrementedDate.getMonth() + 1}-${incrementedDate.getDate() ? `0${incrementedDate.getDate()}` : incrementedDate.getDate()}`;
  }

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
          <input type="date" defaultValue={incrementDateBy30Days()} onChange={e => setExpirationDate(e.target.value)} />
        </div>
        <div class="form-group">
          <label className="mr-3" for="price">Price</label>
          <input type="number" defaultValue={45} onChange={e => setPrice(e.target.value)} />
          <span> BGN</span>
        </div>
        <button className="btn btn-lg btn-primary" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
}