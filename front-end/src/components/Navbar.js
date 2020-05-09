import React, { useState, useEffect, Fragment } from "react";
import {
    Navbar,
    NavDropdown,
    Nav,
    Form,
    FormControl,
    Button
} from "react-bootstrap";
const Typeahead = require('react-bootstrap-typeahead').Typeahead;

export default function NavBar() {
    const [search, setSearch] = useState();
    const [user, setUser] = useState();
    const [dataListings, setDataListings] = useState();

    function onSubmit(e) {
        e.preventDefault();
        //window.location.href = `/videos/s/${search}`;
    };

    function onChange(e) {
        setSearch(e);
    }


    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Fitness-Best</Navbar.Brand>
            <Form inline className="ml-5">
                <Typeahead
                    id="labelkey-example"
                    onInputChange={onChange}
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
                <Nav className="ml-auto">
                    <Nav.Link href="/create/membership" >
                        Create membership
            </Nav.Link>
                    <Nav.Link href="/clients" >
                        Clients
            </Nav.Link>
                    <Nav.Link href="/expenses">
                        Expenses
            </Nav.Link>
                    <Nav.Link href="/profit">
                        Profit
            </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}