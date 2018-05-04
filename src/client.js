import React from "react";
const initEvent = new CustomEvent( "OTS.ready", {

    detail: { message: "Hello from experimenz.openteamspace.com 2" },
    bubbles: true

} );
setTimeout( () => {
    
    console.log( "Dispatching", initEvent );
    document.body.dispatchEvent( initEvent );

}, 1000 );
