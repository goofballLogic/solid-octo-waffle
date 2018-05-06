import React from "react";
import { hot } from "react-hot-loader";
import { MemoryRouter as Router, Route } from "react-router-dom";
import SummaryDashboard from "./SummaryDashboard";
import TeamDashboard from "./TeamDashboard";
import TeamUpdate from "./TeamUpdate";

import "./App.css";

const App = () => <Router>
    
    <div className="experimenz-ots">
        
        <Route exact path="/team/update" component={TeamUpdate} />
        <Route exact path="/team/kiosk" component={ () => <TeamDashboard kiosk /> } />
        <Route exact path="/team" component={ TeamDashboard } />
        <Route exact path="/kiosk" component={ () => <SummaryDashboard kiosk /> } />
        <Route exact path="/" component={ SummaryDashboard } />
    
    </div>

</Router>;

export default hot(module)(App);