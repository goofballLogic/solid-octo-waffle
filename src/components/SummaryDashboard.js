import React from  "react";
import Impact from "./impact/Dashboard";
import Team from "./team/Summary";
import KioskControl from "./KioskControl";

import { accumulate } from "tc2-react-time-series-graph";

import "./SummaryDashboard.css";

const SummaryDashboard = ( { kiosk, team, events } ) => 
    
    <div className={ `summary-dashboard${kiosk ? " kiosk" : ""}` }>

        <Impact />
        <Team series={ team } data={ accumulate( events ) } events={ events } />
        <KioskControl kiosk={ kiosk } big="/kiosk" small="/" />

    </div>;

export default SummaryDashboard;