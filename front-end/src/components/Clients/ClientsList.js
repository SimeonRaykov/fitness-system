import React, { useState, useEffect } from 'react';
import faker from 'faker'
import SmartDataTable from 'react-smart-data-table';
import { Form, Card } from 'react-bootstrap';
import { fetchClients } from '../../api';
import VerticallyCenteredModal from '../Modals/Modal';
import notification from '../utils/toastify';

export default function ClientsList() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchClients());
    }
    fetchAPI();
  }, [], [handleClientDeletion]);

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchClients());
    }
    fetchAPI();
  }, [handleClientDeletion]);

  function deleteRow(row) {
    setClientName(row.Client);
    setModalShow(true);
  }

  function handleClientDeletion() {
    notification('success', 'Client deleted');
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
    Update: {
      text: 'Update membership',
      invisible: false,
      sortable: false,
      filterable: false,
      transform: (value, index, row) => {
        return (
          <button className="btn btn-primary" onClick={() => deleteRow(row)}>
            Update membership
          </button>
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
            Delete Row
          </button>
        )
      },
    },
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
          perPage={10}
          loader
          headers={headers}
          filterValue={searchValue}
        />
      </Card>
      <VerticallyCenteredModal
        show={modalShow}
        clientName={clientName}
        onClientDeletion={handleClientDeletion}
        onHide={() => setModalShow(false)}
      />
    </div >
  )
}
