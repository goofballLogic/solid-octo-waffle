import { Link } from "react-router-dom";

import "./Material.css";

export const FloatNavButton = ( { text, to, children } ) => <Link to={to} title={text} className="btn--floating btn--fixed accent btn--small btn--right btn--top btn">

    <div className="btn__content">

        <i className="icon">{children}</i>

    </div>

</Link>;

export const ButtonRight = ( { text, children, onClick } ) => <div className="btn primary" onClick={onClick}>

    <div className="btn__content">

        {text}
        <i className="icon icon--right">{children}</i>

    </div>

</div>;

export const NavButton = ( { text, to } ) => <Link to={to} title={text} className="btn primary nav-button">

    <div className="btn__content">

        {text}

    </div>

</Link>;

export const NavButtonRight = ( { text, children, to } ) => <Link to={to} title={text} className="btn primary nav-button-right">

    <div className="btn__content">

        {text}
        <i className="icon icon--right">{children}</i>

    </div>

</Link>;

export const NavButtonLeft = ( { text, children, to } ) => <Link to={to} title={text} className="btn primary nav-button-left">

    <div className="btn__content">

        <i className="icon icon--left">{children}</i>
        {text}
        
    </div>

</Link>;

export const DisabledButtonRight = ( { text, children } ) => <div title={text} className="btn btn--disabled">

    <div className="btn__content">

        {text}
        <i className="icon icon--right">{children}</i>

    </div>

</div>;
