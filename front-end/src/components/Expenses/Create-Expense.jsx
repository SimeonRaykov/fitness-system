import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { formatDate } from "../utils/date-manipulations";
export default function CreateExpense() {
  const today = new Date();
  const formattedToday = formatDate(today);

  const [name, setName] = useState("");
  const [date, setDate] = useState(formattedToday);
  const [amount, setAmount] = useState(0);

  function submitForm(e) {
    e.preventDefault();
    if (!name) {
      alert("Name required");
    }
    if (!date) {
      alert("Name required");
    }
    if ((date, name, amount)) {
      fetch("/api/expense", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          date,
          amount,
        }),
      });
    }
  }

  return (
    <div className="container mt-5">
      <Card>
        <Form>
          <h2 className="mb-4">Add expense</h2>
          <hr/>
          <Form.Group controlId="name">
            <Form.Label>Expense</Form.Label>
            <Form.Control
              autocomplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              defaultValue={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Enter date"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </Form.Group>
          <Button className="mb-3" onClick={submitForm} variant="primary" type="submit">
            Add expense
          </Button>
        </Form>
      </Card>
    </div>
  );
}
