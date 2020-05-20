import React, { useState, useEffect } from "react";
import SmartDataTable from "react-smart-data-table";
import { Form, Card } from "react-bootstrap";
import { fetchWorkouts } from "../../api";
import { UpdateModal, DeleteModal } from "../index";
import notification from "../utils/toastify";

export default function ListWorkouts() {
  const type = "workout";
  const DEFAULT_ROWS_PER_PAGE = 10;
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutID, setWorkoutID] = useState("");
  const [workoutLink, setWorkoutLink] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchWorkouts());
    };
    fetchAPI();
  }, []);

  useEffect(
    () => {
      const fetchAPI = async () => {
        setData(await fetchWorkouts());
      };
      fetchAPI();
    },
    [handleWorkoutDeletion],
    [handleWorkoutUpdate]
  );

  function updateRow(row) {
    setWorkoutName(row.Workout);
    setWorkoutID(row.id);
    setWorkoutLink(row.Link);
    setUpdateModalShow(true);
  }

  function deleteRow(row) {
    setWorkoutName(row.Workout);
    setWorkoutID(row.id);
    setDeleteModalShow(true);
  }

  function handleWorkoutDeletion() {
    notification("success", "Workout deleted");
  }

  function handleWorkoutUpdate() {
    notification("success", "Workout updated");
  }

  const headers = {
    id: {
      text: "ID",
      invisible: true,
      sortable: false,
      filterable: false,
    },
    Workout: {
      text: "Workout",
      invisible: false,
      sortable: true,
      filterable: true,
    },
    Link: {
      text: "Link",
      invisible: false,
      sortable: true,
      filterable: true,
      transform: (value, index, row) => {
        return <a href={row.Link}>{row.Link}</a>;
      },
    },
    Date: {
      text: "Date created",
      invisible: false,
      sortable: true,
      filterable: true,
    },
    Update: {
      text: "Update workout",
      invisible: false,
      sortable: false,
      filterable: false,
      transform: (value, index, row) => {
        return (
          <button className="btn btn-primary" onClick={() => updateRow(row)}>
            Update workout
          </button>
        );
      },
    },
    Delete: {
      text: "Remove workout",
      invisible: false,
      sortable: false,
      filterable: false,
      transform: (value, index, row) => {
        return (
          <button className="btn btn-danger" onClick={() => deleteRow(row)}>
            Delete workout
          </button>
        );
      },
    },
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Title>Search workouts</Card.Title>
        <Form.Group controlId="searchInput">
          <Form.Control
            style={{ width: "50%", margin: "auto" }}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type="search"
            placeholder="Search"
          />
        </Form.Group>
        <SmartDataTable
          data={data}
          name="test-table"
          className="ui compact selectable  table"
          sortable
          perPage={DEFAULT_ROWS_PER_PAGE}
          loader
          headers={headers}
          filterValue={searchValue}
        />
      </Card>
      {workoutName?
      <UpdateModal
        type={type}
        show={updateModalShow}
        name={workoutName}
        id={workoutID}
        link={workoutLink}
        onApiCall={handleWorkoutUpdate}
        onHide={() => setUpdateModalShow(false)}
      />
:''}
      <DeleteModal
        type={type}
        show={deleteModalShow}
        name={workoutName}
        id={workoutID}
        onApiCall={handleWorkoutDeletion}
        onHide={() => setDeleteModalShow(false)}
      />
    </div>
  );
}
