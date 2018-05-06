import React from  "react";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { accumulate } from "tc2-react-time-series-graph";

import KioskControl from "./KioskControl";
import { NavButtonLeft, NavButton } from "./Material";
import Details from "./team/Details";

import "./TeamDashboard.css";
import GoLeft from "../svg/go-left.svg";

const latest = events => new Date( [ ...events ].sort( 
    
    ( a, b ) => ( new Date( a.when ).valueOf() - new Date( b.when ).valueOf() ) 

)[ 0 ].when );

const TeamDashboard = ( { kiosk, events, team } ) => <div className={ `team-dashboard${kiosk ? " kiosk" : ""}` }>

    <h1>
        
        Team performance
        <NavButtonLeft to="/" text="Back"><GoLeft /></NavButtonLeft>

    </h1>
    <h2>

        Last updated: { format( latest( events ), "dddd [the] Do [of] MMMM YYYY" ) }
        <NavButton to="/team/update" text="Update" />
    
    </h2>
    <KioskControl kiosk={ kiosk } big="/team/kiosk" small="/team" />
    <Details series={ team } data={ accumulate( events ) } events={ events } />

</div>;

export default TeamDashboard;