import React from "react";
import "./PendingChanges.css";
import Tick from "../svg/tick.svg";
import Save from "../svg/save.svg";
import { NavButtonLeft } from "./Material";

export default ( { behaviours, pending = {} } ) => <div className="pending-changes">

    <ul>{behaviours.map( b => 
    
        <li className={( b.id in pending ) ? "queued" : undefined} key={b.id}><Tick />{ b.title }</li>

    )}</ul>
    <NavButtonLeft to="/team" text="Save"><Save /></NavButtonLeft>
    
</div>;
