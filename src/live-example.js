import { team, events } from "./live-example-data";
/*

    Create a promise that resolves once OTS is ready
    The promise returns the detail of the event, which contains the "render" function

*/
const promiseOTS = new Promise( resolve => 

    window.addEventListener( "OTS.ready", e => resolve( e.detail ) )

);
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
            .then( x => x.render( "#retros", { team, events } ) )
            .then( () => console.log( "Retros is rendered" ) );

    }

} );