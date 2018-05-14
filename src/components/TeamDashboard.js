import React from  "react";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { accumulate } from "tc2-react-time-series-graph";

import KioskControl from "./KioskControl";
import { NavButtonLeft, NavButton } from "./Material";
import Details from "./team/Details";

import "./TeamDashboard.css";
import GoLeft from "../svg/go-left.svg";

const maybeLatest = events => [ ...events ].sort( 
    
    ( a, b ) => ( new Date( b.when ).valueOf() - new Date( a.when ).valueOf() ) 

)[ 0 ];
const maybeFormat = ( x, pattern ) => x ? format( x.when, pattern ) : "none";

const TeamDashboard = ( { kiosk, events, team } ) => <div className={ `team-dashboard${kiosk ? " kiosk" : ""}` }>

    <h1>
        
        Team performance
        <NavButtonLeft to="/" text="Back"><GoLeft /></NavButtonLeft>

    </h1>
    <h2>

        Last updated: { maybeFormat( maybeLatest( events ), "dddd [the] Do [of] MMMM YYYY" ) }
        
    </h2>
    <NavButton to="/team/update" text="Update" />
    <KioskControl kiosk={ kiosk } big="/team/kiosk" small="/team" />
    <Details series={ team } data={ accumulate( events ) } events={ events } />

</div>;

export default TeamDashboard;