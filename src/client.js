import React, { Component } from "react";
import { render } from "react-dom";

class Counter extends Component {

    constructor() {

        super();
        this.state = { count: 0 };

    }
    handleClick() {

        this.setState( { count: this.state.count + 1 } );
        
    }
    render() {

        return <div>
            
            <span>{this.state.count}</span>
            <button onClick={() => this.handleClick()} type="button" className="btn primary">Add</button>
        
        </div>;

    }
}
const Thing = () => <div>

    I am react
    <Counter />

</div>;

function renderBySelector( selector ) {

    const container = document.querySelector( selector );
    if ( !container ) { throw new Error( "No container found: " + selector ); }
    return render( <Thing />, container );

}

document.body.dispatchEvent( new CustomEvent( "OTS.ready", {

    detail: { render: renderBySelector },
    bubbles: true

} ) );