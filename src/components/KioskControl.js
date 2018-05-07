import React from "react";
import { Link } from "react-router-dom";

import "./KioskControl.css";
import Expand from "../svg/expand.svg";
import Collapse from "../svg/collapse.svg";
import { FloatNavButton, NavButtonRight } from "./Material";

const KioskControl = ( { kiosk, big, small } ) => <div className="kiosk-control">

    {kiosk
        ? <FloatNavButton to={small} text="collapse"><Collapse /></FloatNavButton>
        : <FloatNavButton to={big} text="Expand"><Expand /></FloatNavButton>}

</div>;

export default KioskControl;
