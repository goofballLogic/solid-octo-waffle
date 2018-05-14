import React from  "react";
import { accumulate } from "tc2-react-time-series-graph";

import Impact from "./impact/Summary";
import Team from "./team/Summary";
import KioskControl from "./KioskControl";
import { NavButtonRight } from "./Material";

import "./SummaryDashboard.css";
import GoRight from "../svg/go-right.svg";

const SummaryDashboard = ( { kiosk, team, events } ) =>
   
    <div className={ `summary-dashboard${kiosk ? " kiosk" : ""}` }>

        <KioskControl kiosk={ kiosk } big="/kiosk" small="/" />
        <Impact />
        <div>
            <h1>
            
                Team performance
                <NavButtonRight to="/team" text="Open"><GoRight /></NavButtonRight>

            </h1>  
            <Team series={ team } data={ accumulate( events ) } events={ events } />
        </div>

    </div>;

export default SummaryDashboard;

if( module.hot ) { module.hot.accept(); }