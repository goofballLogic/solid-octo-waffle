import React from  "react";
import Impact from "./impact/Dashboard";
import Team from "./team/Dashboard";
import KioskControl from "./KioskControl";

import "./SummaryDashboard.css";

const SummaryDashboard = ( { kiosk } ) => 
    
    <div className={ `summary-dashboard${kiosk ? " kiosk" : ""}` }>

        <Impact />
        <Team />
        <KioskControl kiosk={ kiosk } big="/kiosk" small="/" />

    </div>;

export default SummaryDashboard;