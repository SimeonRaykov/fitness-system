import React, { useState, useEffect, Fragment } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
const Typeahead = require("react-bootstrap-typeahead").Typeahead;

export default function NavBar() {
  const [search, setSearch] = useState();
  const [user, setUser] = useState();
  const [dataListings, setDataListings] = useState();

  useEffect(() => {
    getDataListings();
  }, []);

  function searchForClient(e) {
    if (e[0] && e[0].name) {
      window.location.href = `/clients/${e[0].name}`;
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    window.location.href = `/clients/${search}`;
  }

  async function getDataListings() {
    await fetch("/api/clients/dataListings", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        setDataListings(response);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Fitness-Best</Navbar.Brand>
      <Form inline className="ml-5">
        <Typeahead
          id="labelkey-example"
          onChange={searchForClient}
          onInputChange={setSearch}
          value={search}
          labelKey={(option) => `${option.name}`}
          displayEmptyLabel={false}
          options={dataListings}
          placeholder="Search for client"
        />
        <Button
          type="submit"
          onClick={onSubmit}
          variant="outline-primary"
          className="ml-1"
        >
          Search
        </Button>
      </Form>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/create-membership">Create membership</Nav.Link>
          <Nav.Link href="/clients">Clients</Nav.Link>
          <NavDropdown title="Expenses" id="basic-nav-dropdown">
            <NavDropdown.Item href="/add-expense">
              Add expenses
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/expenses">List expenses</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Workouts" id="basic-nav-dropdown">
            <NavDropdown.Item href="/add-workout">Add workout</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/workouts">List workouts</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/profit">Profit</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
