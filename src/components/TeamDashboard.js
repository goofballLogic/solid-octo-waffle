import React from  "react";
import { Link } from "react-router-dom";
import KioskControl from "./KioskControl";

import "./TeamDashboard.css";

const TeamDashboard = ( { kiosk } ) => <div className={ `team-dashboard${kiosk ? " kiosk" : ""}` }>

    <Link to="/">Dashboard</Link>
    Hello team dashboard
    <Link to="/team/update">Update</Link>
    <KioskControl kiosk={ kiosk } big="/team/kiosk" small="/team" />

</div>;

export default TeamDashboard;