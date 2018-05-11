import React, { Component } from "react";
import { render } from "react-dom";
import App from "./components/App";

import "./reset.css";
import "./graph.css";

function renderBySelector( selector, data ) {

    const container = document.querySelector( selector );
    if ( !container ) { throw new Error( "No container found: " + selector ); }
    if ( !data ) { throw new Error( "No data supplied" ); }
    const missing = [ "team", "events", "behaviours", "behaviourTemplate", "roles", "roleTemplate" ]
        .filter( propName => !data[ propName ] );
    if ( missing.length ) {

        throw new Error( "Missing data: " + missing.join( ", " ) );

    }
    function handleDispatchUpdates( updates ) {

        return new Promise( ( resolve, reject ) => {

            document.body.dispatchEvent( new CustomEvent( "OTS.updates", {

                detail: { 
                
                    updates,
                    resolve,
                    reject

                }

            } ) );
            setTimeout( () => reject( new Error( "Failed to save" ) ), 10000 );

        } );

    }
    render( <App {...data} handleDispatchUpdates={ handleDispatchUpdates } />, container );

}

window.addEventListener( "DOMContentLoaded", () => {

    console.log( "Sending OTS.ready" );
    document.body.dispatchEvent( new CustomEvent( "OTS.ready", {

        detail: { render: renderBySelector },
        bubbles: true

    } ) );

} );