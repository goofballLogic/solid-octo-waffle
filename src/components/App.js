import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { MemoryRouter as Router, Route } from "react-router-dom";
import SummaryDashboard from "./SummaryDashboard";
import TeamDashboard from "./TeamDashboard";
import TeamUpdate from "./TeamUpdate";

import "./App.css";

class App extends Component {
    
    constructor() {

        super();
        this.state = {};
        setTimeout( () => this.setState( { rerender: new Date() } ), 1000 );

    }

    componentDidCatch(error, info) {

        this.setState( { error, info } );

    }

    render() {
        
        console.log( "Render" );
        return <Router>

            { console.log( this.state.error, this.state.info ) || this.state.error
                
                ? <div className="experimenz-ots error-state">
                    <h2>An error occurred</h2>
                    <input id="error-state-collapsible" type="checkbox" />
                    <label className="btn error" for="error-state-collapsible">Details</label>
                    <div className="detail">
                        <pre>{ this.state.error.stack }</pre>
                        <pre>{ this.state.info.componentStack }</pre>
                    </div>
                </div>
                : <div className="experimenz-ots">

                    <Route exact path="/team/update" component={ () => <TeamUpdate {...this.props} /> } />
                    <Route exact path="/team/kiosk" component={ () => <TeamDashboard kiosk {...this.props} /> } />
                    <Route exact path="/team" component={ () => <TeamDashboard {...this.props} /> } />
                    <Route exact path="/kiosk" component={ () => <SummaryDashboard kiosk {...this.props} /> } />
                    <Route exact path="/" component={ () => <SummaryDashboard {...this.props} /> } />
                
                </div> }

        </Router>;

    }

}

export default hot(module)(App);