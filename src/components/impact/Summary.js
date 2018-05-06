import React from "react";

import Icon from "../../svg/construction.svg";
import "./Summary.css";

import GoRight from "../../svg/go-right.svg";
import { DisabledButtonRight } from "../Material";

const Summary = () => <article className="impact-summary">

    <h1>
        
        Impact assessments
        <DisabledButtonRight to="/impact" text="Open"><GoRight /></DisabledButtonRight>
        
    </h1>
    <p className="under-construction">
        <Icon />
        Under construction
    </p>

</article>;

export default Summary;