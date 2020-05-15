import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";

export default function CreateWorkout() {
  const [workoutName, setWorkoutName] = useState();
  const [workoutLink, setWorkoutLink] = useState();

  function submitForm(e) {
    e.preventDefault();
    if (!workoutName || !workoutLink) {
      alert("Workout name and link are required!");
    } else {
      fetch("/api/workout", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: workoutName,
          link: workoutLink,
        }),
      });
    }
  }

  return (
    <div className="container mt-5">
      <Card>
        <Form>
          <h2 className="mb-4">Add workout</h2>
          <hr />
          <Form.Group controlId="name">
            <Form.Label>Workout</Form.Label>
            <Form.Control
              autocomplete="off"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              type="text"
              placeholder="Enter workout name"
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Link</Form.Label>
            <Form.Control
              autocomplete="off"
              value={workoutLink}
              onChange={(e) => setWorkoutLink(e.target.value)}
              type="text"
              placeholder="Enter link"
            />
          </Form.Group>
          <Button
            className="mb-3"
            onClick={submitForm}
            variant="primary"
            type="submit"
          >
            Add workout
          </Button>
        </Form>
      </Card>
    </div>
  );
}
