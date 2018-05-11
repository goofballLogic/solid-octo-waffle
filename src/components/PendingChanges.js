import React from "react";
import "./PendingChanges.css";
import Tick from "../svg/tick.svg";
import Save from "../svg/save.svg";
import { ButtonRight } from "./Material";

export default ( { behaviours, pending = {}, handleSave } ) => <div className="pending-changes">

    <h3>Pending changes</h3>
    <ul>{behaviours.map( b => 
    
        <li className={( b.id in pending ) ? "queued" : undefined} key={b.id}><Tick />{ b.title }</li>

    )}</ul>
    <ButtonRight to="/team" text="Save" onClick={handleSave}><Save /></ButtonRight>
    
</div>;
