import React from "react";
import { render } from "react-dom";

const Thing = () => <div>

    I am react

</div>;

window.addEventListener( "OTS.start", ( { detail } ) => {

    console.log( "OTS.start arrived" );
    const container = document.querySelector( detail.container );
    if ( !container ) { throw new Error( "No container found: " + detail.container ); }
    render( <Thing />, container );

} );
document.body.dispatchEvent( new CustomEvent( "OTS.ready", {

    detail: { message: "Hello from experimenz.openteamspace.com 2" },
    bubbles: true

} ) );