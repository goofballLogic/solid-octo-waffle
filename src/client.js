import React, { Component } from "react";
import { render } from "react-dom";
import App from "./components/App";

function renderBySelector( selector, data ) {

    const container = document.querySelector( selector );
    if ( !container ) { throw new Error( "No container found: " + selector ); }
    render( <App {...data} />, container );

}

document.body.dispatchEvent( new CustomEvent( "OTS.ready", {

    detail: { render: renderBySelector },
    bubbles: true

} ) );
