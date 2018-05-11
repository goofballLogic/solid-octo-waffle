import { team, events, roles, roleTemplate, behaviours, behaviourTemplate } from "./live-example-data";
/*

    Create a promise that resolves once OTS is ready
    The promise returns the detail of the event, which contains the "render" function

*/
const promiseOTS = new Promise( resolve => 

    window.addEventListener( "OTS.ready", e => resolve( e.detail ) )

);
/*

    Listen for updates from OTS

*/
const updateListener = window.addEventListener( "OTS.updates", e => {

    const { updates, resolve } = e.detail;
    alert( "Got updates from OTS: " + JSON.stringify( updates ) );
    setTimeout( () => resolve( "Thanks for these!" ), 2000 );

} );
/*

    Spin up the host Vue application

*/
var app = new Vue( {
    
    el: "#live-example",
    data: {

        active: null

    },
    updated: function() {

        console.log( "Application is mounted" );
        promiseOTS
            .then( x => x.render( "#retros", { team, events, roles, roleTemplate, behaviours, behaviourTemplate } ) )
            .then( () => console.log( "Retros is rendered" ) );

    }

} );