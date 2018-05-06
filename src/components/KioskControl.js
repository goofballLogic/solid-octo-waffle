import React from "react";
import { Link } from "react-router-dom";

import "./KioskControl.css";
import Expand from "../svg/expand.svg";
import Collapse from "../svg/collapse.svg";
import { FloatButton } from "./Material";

const KioskControl = ( { kiosk, big, small } ) => kiosk

    ? <Link className="kiosk-control" to={small} title="collapse">
    
        <FloatButton><Collapse /></FloatButton>
        
    </Link>
    : <Link className="kiosk-control" to={big} title="expand">

        <FloatButton><Expand /></FloatButton>

    </Link>;

export default KioskControl;
