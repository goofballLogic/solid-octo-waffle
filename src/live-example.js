window.addEventListener( "OTS.ready", e => {

    console.log( "OTS.ready was received - sending OTS.start" );
    document.dispatchEvent( new CustomEvent(

        "OTS.start",
        { 
            detail: { container: "#live-example" },
            bubbles: true
        }

    ) );

} );