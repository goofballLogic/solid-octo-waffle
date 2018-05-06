import React, { Component } from "react";
import { render } from "react-dom";
import App from "./App";

function renderBySelector( selector ) {

    const container = document.querySelector( selector );
    if ( !container ) { throw new Error( "No container found: " + selector ); }
    render( <App />, container );
    
}

document.body.dispatchEvent( new CustomEvent( "OTS.ready", {

    detail: { render: renderBySelector },
    bubbles: true

} ) );
