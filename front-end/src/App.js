import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Client,
  CreateCard,
  ListClients,
  CreateExpense,
  ListExpenses,
  CreateWorkout,
  ListWorkouts,
  Profit,
  Navbar,
  Footer,
} from "./components";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/create-membership" exact component={CreateCard} />
          <Route path="/clients" exact component={ListClients} />
          <Route path="/clients/" component={Client} />
          <Route path="/add-expense" exact component={CreateExpense} />
          <Route path="/expenses" exact component={ListExpenses} />
          <Route path="/add-workout" exact component={CreateWorkout} />
          <Route path="/workouts" exact component={ListWorkouts} />
          <Route path="/profit" exact component={Profit} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
