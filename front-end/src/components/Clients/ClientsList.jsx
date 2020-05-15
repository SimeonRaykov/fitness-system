import React, { useState, useEffect } from 'react';
import faker from 'faker'
import SmartDataTable from 'react-smart-data-table';
import { Form, Card } from 'react-bootstrap';
import { fetchClients } from '../../api';
import { UpdateModal, DeleteModal } from '../index';
import notification from '../utils/toastify';
import incrementDateBy30Days from '../utils/date-manipulations';

export default function ClientsList() {
  const type = 'client';
  const DEFAULT_ROWS_PER_PAGE = 10;
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchClients());
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchClients());
    }
    fetchAPI();
  }, [handleClientDeletion], [handleClientUpdate]);

  function updateRow(row) {
    setClientName(row.Client);
    setUpdateModalShow(true);
  }

  function deleteRow(row) {
    setClientName(row.Client);
    setDeleteModalShow(true);
  }

  function handleClientDeletion() {
    notification('success', 'Client deleted');
  }

  function handleClientUpdate() {
    notification('success', 'Membership updated');
  }

  const headers = {
    Client: {
      text: 'Client',
      invisible: false,
      sortable: true,
      filterable: true,
    },
    ID: {
      text: 'ID',
      invisible: false,
      sortable: true,
      filterable: true,
    },
    ExpDate: {
      text: 'Expiration date',
      invisible: false,
      sortable: true,
      filterable: true,
    },
    Status: {
      text: 'Status',
      invisible: false,
      sortable: true,
      filterable: true,
      transform: (value, index, row) => {
        const expDate = new Date(row.ExpDate);
        const today = new Date();
        const expired = checkIfDateIsExpired(today, expDate);
        return (
          expired ? 'Expired' : 'Valid'
        )
      }
    },
    Update: {
      text: 'Update membership',
      invisible: false,
      sortable: false,
      filterable: false,
      transform: (value, index, row) => {
        return (
          <button className="btn btn-primary" onClick={() => updateRow(row)
          }>
            Update membership
          </button >
        )
      }
    },
    Delete: {
      text: 'Remove client',
      invisible: false,
      sortable: false,
      filterable: false,
      transform: (value, index, row) => {
        return (
          <button className="btn btn-danger" onClick={() => deleteRow(row)}>
            Delete client
          </button>
        )
      },
    },
  }

  function checkIfDateIsExpired(today, expDate) {
    let expired;
    if (today.getFullYear() > expDate.getFullYear()) {
      expired = true;
    }
    else if (today.getFullYear() === expDate.getFullYear()) {
      if (today.getMonth() > expDate.getMonth()) {
        expired = true;
      }
      else if (today.getMonth() === expDate.getMonth()) {
        if (today.getDate() > expDate.getDate()) {
          expired = true;
        }
        else {
          expired = false;
        }
      }
      else {
        expired = false;
      }
    }
    else {
      expired = false;
    }
    return expired;
  }

  return (
    <div className="container mt-4" >
      <Card>
        <Card.Title>Search Clients</Card.Title>
        <Form.Group controlId="searchInput">
          <Form.Control style={{ width: "50%", margin: "auto" }} onChange={e => setSearchValue(e.target.value)} value={searchValue} type="search" placeholder="Search" />
        </Form.Group>
        <SmartDataTable
          data={data}
          name='test-table'
          className='ui compact selectable  table'
          sortable
          perPage={DEFAULT_ROWS_PER_PAGE}
          loader
          headers={headers}
          filterValue={searchValue}
        />
      </Card>
      <UpdateModal
        type={type}
        show={updateModalShow}
        name={clientName}
        onApiCall={handleClientUpdate}
        onHide={() => setUpdateModalShow(false)}
      />
      <DeleteModal
        type={type}
        show={deleteModalShow}
        name={clientName}
        onApiCall={handleClientDeletion}
        onHide={() => setDeleteModalShow(false)}
      />
    </div >
  )
}
