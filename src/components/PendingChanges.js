import React from "react";
import "./PendingChanges.css";
import Tick from "../svg/tick.svg";
import Save from "../svg/save.svg";
import { ButtonRight } from "./Material";

export default ( { behaviours, pending = {}, handleSave, date, handleDateChange } ) => <div className="pending-changes">

    <label>

        <h3>Assessment</h3>
        <input type="date" onChange={handleDateChange.bind( this )} value={date} />

    </label>
    <ul>{behaviours.map( b =>

        <li className={( b.id in pending ) ? "queued" : undefined} key={b.id}><Tick />{ b.title }</li>

    )}</ul>
    <ButtonRight to="/team" text="Save & finish" onClick={handleSave}><Save /></ButtonRight>

</div>;
