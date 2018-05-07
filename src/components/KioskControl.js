import React from "react";
import { Link } from "react-router-dom";

import "./KioskControl.css";
import Expand from "../svg/expand.svg";
import Collapse from "../svg/collapse.svg";
import { FloatNavButton, NavButtonRight } from "./Material";

const KioskControl = ( { kiosk, big, small } ) => <div className="kiosk-control">

    {kiosk
        ? <FloatNavButton to={small} title="collapse"><Collapse /></FloatNavButton>
        : <NavButtonRight to={big} text="Expand"><Expand /></NavButtonRight>}

</div>;

export default KioskControl;
