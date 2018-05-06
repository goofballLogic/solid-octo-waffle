import React from "react";
import { Link } from "react-router-dom";

import "./KioskControl.css";
import Expand from "../svg/expand.svg";
import Collapse from "../svg/collapse.svg";

const Matty = ( { children } ) => <div className="btn--floating accent btn--small btn--fixed btn--right btn--top btn">

    <div className="btn__content">

        <i className="icon">{children}</i>
    
    </div>

</div>;

const KioskControl = ( { kiosk, big, small } ) => kiosk

    ? <Link className="kiosk-control" to={small} title="collapse">
    
        <Matty><Collapse /></Matty>
        
    </Link>
    : <Link className="kiosk-control" to={big} title="expand">

        <Matty><Expand /></Matty>

    </Link>;

export default KioskControl;
