import React, { useState, useEffect } from "react";
import SmartDataTable from "react-smart-data-table";
import { Form, Card } from "react-bootstrap";
import { fetchExpenses } from "../../api";
import { UpdateModal, DeleteModal } from "../index";
import notification from "../utils/toastify";

export default function ExpensesList() {
  const type = "expense";
  const DEFAULT_ROWS_PER_PAGE = 10;
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [id, setID] = useState();
  const [amount, setAmount] = useState();
  const [expenseName, setExpenseName] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchExpenses());
    };
    fetchAPI();
  }, []);

  useEffect(
    () => {
      const fetchAPI = async () => {
        setData(await fetchExpenses());
      };
      fetchAPI();
    },
    [handleExpenseDeletion],
    [handleExpenseUpdate]
  );

  function updateRow(row) {
    setID(row.id);
    setAmount(row.Amount);
    setExpenseName(row.Expense);
    setUpdateModalShow(true);
  }

  function deleteRow(row) {
    setExpenseName(row.Expense);
    setDeleteModalShow(true);
  }

  function handleExpenseDeletion() {
    notification("success", "Expense deleted");
  }

  function handleExpenseUpdate() {
    notification("success", "Expense updated");
  }

  const headers = {
    id:{
      text:'id',
      invisible:true
    },
    Expense: {
      text: "Expense",
      invisible: false,
      sortable: true,
      filterable: true,
    },
    Amount: {
      text: "Amount",
      invisible: false,
      sortable: true,
      filterable: true,
    },
    Date: {
      text: "Date",
      invisible: false,
      sortable: true,
      filterable: true,
    },
    Update: {
      text: "Update expense",
      invisible: false,
      sortable: false,
      filterable: false,
      transform: (value, index, row) => {
        return (
          <button className="btn btn-primary" onClick={() => updateRow(row)}>
            Update expense
          </button>
        );
      },
    },
    Delete: {
      text: "Remove expense",
      invisible: false,
      sortable: false,
      filterable: false,
      transform: (value, index, row) => {
        return (
          <button className="btn btn-danger" onClick={() => deleteRow(row)}>
            Delete expense
          </button>
        );
      },
    },
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Title>Search Expenses</Card.Title>
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
      {amount?
      <UpdateModal
        type={type}
        show={updateModalShow}
        name={expenseName}
        amount={amount}
        id={id}
        onApiCall={handleExpenseUpdate}
        onHide={() => setUpdateModalShow(false)}
        />
      :''}
      <DeleteModal
        type={type}
        show={deleteModalShow}
        name={expenseName}
        id={id}
        onApiCall={handleExpenseDeletion}
        onHide={() => setDeleteModalShow(false)}
      />
    </div>
  );
}
