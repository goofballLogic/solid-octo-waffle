import React from "react";
import { Link } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = () => <article className="team-dashboard">

    <h2>Team performance</h2>
    <nav>
        <Link to="/team">Open</Link>
    </nav>

</article>;

export default Dashboard;