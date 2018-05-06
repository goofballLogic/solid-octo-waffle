import React, { Component } from "react";
import { render } from "react-dom";
import App from "./components/App";

import "./reset.css";
import "./graph.css";

function renderBySelector( selector, data ) {

    const container = document.querySelector( selector );
    if ( !container ) { throw new Error( "No container found: " + selector ); }
    if ( !data ) { throw new Error( "No data supplied" ); }
    if ( !data.team ) { throw new Error( "Missing data prop: team" ); }
    if ( !data.events ) { throw new Error( "Missing data prop: events" ); }
    render( <App {...data} />, container );

}

document.body.dispatchEvent( new CustomEvent( "OTS.ready", {

    detail: { render: renderBySelector },
    bubbles: true

} ) );
