import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "bootstrap/dist/css/bootstrap.css";
import CreateCard from './components/Card/Create-Card';
import ListClients from './components/Clients/ClientsList';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            path="/create/membership"
            exact
            component={
              CreateCard
            }
          />
          <Route
            path="/clients"
            exact
            component={
              ListClients
            }
          />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
