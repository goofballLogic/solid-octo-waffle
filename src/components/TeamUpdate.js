import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Scoring } from "tc2-react-good-bad-tracker";
import { NavButtonLeft } from "./Material";
import GoLeft from "../svg/go-left.svg";
import PendingChanges from "./PendingChanges";

import "./TeamUpdate.css";

var roles = [ { 
    id: "role1",
    title: "Get stuff done in time",
    specifics: "We won't commit to things we can't deliver so that we get everything prioritised finished on time. \"End of sprint\" means the end of Friday (not over the weekend!)",
    measurement: "Were all commits Done before the end of the sprint?",
},
{ 
    id: "role2",
    title: "Focus on top priorities first",
    specifics: "Get it working first. Refine the solution as you have time available. Define test plans and implement basic functionality during the first half of the sprint.",
    measurement: "Was basic functionality and test planning complete by Wednesday?"
},
{ 
    id: "role3",
    title: "Keep the app fully running at all times",
    specifics: "We should be able to pull the latest code without fear of it breaking our development environment.",
    measurement: "Did all our code pushes go through without breaking CI or another team member's build/environment?"
} ];
const roleTemplate = [ "title", "specifics", "measurement" ];

var behaviours = [ {

    id: "behaviour1",
    roleId: "role1",
    title: "Role 1 Behaviour 1",
    description: "Ut sed quam sed purus fermentum imperdiet non ac quam. Morbi pellentesque gravida vehicula. Suspendisse libero metus, bibendum ut nisi ut, consequat condimentum urna.",
    
}, {

    id: "behaviour2",
    roleId: "role1",
    title: "Role 1 Behaviour 2 which has a long title which might not fit in",
    description: "Maecenas metus diam, luctus non pulvinar ac, rhoncus et eros. Donec eleifend ex nisl, a laoreet dolor viverra varius.",
    upScore: Math.floor( Math.random() * 3 ) || 1,
    downScore: Math.floor( Math.random() * 3 ) || undefined

}, {

    id: "behaviour3",
    roleId: "role1",
    title: "Role 1 Behaviour 3",
    description: "Duis odio velit, mollis id dolor a, maximus vehicula justo.",
    upScore: Math.floor( Math.random() * 3 ) || 1,
    downScore: Math.floor( Math.random() * 3 ) || undefined

}, {

    id: "behaviour4",
    roleId: "role2",
    title: "Role 2 Behaviour 1",
    description: "Fusce hendrerit felis sit amet risus aliquam luctus.",
    upScore: Math.floor( Math.random() * 3 ) || 1,
    downScore: Math.floor( Math.random() * 3 ) || undefined

}, {

    id: "behaviour5",
    roleId: "role2",
    title: "Role 2 Behaviour 2",
    description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    upScore: Math.floor( Math.random() * 3 ) || 1,
    downScore: Math.floor( Math.random() * 3 ) || undefined

}, {

    id: "behaviour6",
    roleId: "role3",
    title: "Role 3 Behaviour 1",
    description: "Sed in placerat mi, sit amet pellentesque magna. Vestibulum malesuada lacus non consectetur suscipit.",
    upScore: Math.floor( Math.random() * 3 ) || 1,
    downScore: Math.floor( Math.random() * 3 ) || undefined

}, {

    id: "behaviour7",
    roleId: "role3",
    title: "Role 3 Behaviour 2",
    description: "Ut quis elit diam. Duis ultricies hendrerit libero vitae sodales. Vestibulum cursus tortor pulvinar ipsum pharetra faucibus. Nam et purus eu augue condimentum volutpat sed sed neque. Donec sodales feugiat laoreet.",
    upScore: Math.floor( Math.random() * 3 ) || 1,
    downScore: Math.floor( Math.random() * 3 ) || undefined

} ];

const behaviourTemplate = [ 
    
    "title", 
    "description",
    { 
                
        "key": "up",
        "prop": "upScore",
        "className": "score {key} {truthiness}"
        
    },
    { 
        "key": "down",
        "prop": "downScore",
        "className": "score {key} {truthiness}"
        
    } 

];

function decorateMenuClasses( className ) {

    switch( className ) {

        case "choose":
        case "cancel":
            return `${className} btn primary btn--small`;
        default:
            return className;

    }

}
class TeamUpdate extends Component {
    
    constructor() {

        super();
        this.state = {};

    }
    handleRoleChange( e, role ) {

        if ( this.state.role ) { return e.preventDefault(); }
        const roleBehaviours = role ? behaviours.filter( x => x.roleId === role.id ) : undefined;
        this.setState( { 

            role, 
            behaviours: roleBehaviours,
            behaviour: undefined

         } );

    }
    handleBehaviourChange( e, behaviour ) {

        if ( this.state.behaviour ) { return e.preventDefault(); }
        this.setState( { behaviour } );

    }
    handleScoringChange( scores ) {

        const { behaviour } = this.state;
        const pending = this.state.pending || {};
        if( scores && Object.values( scores ).filter( x => x ).length ) {

            pending[ behaviour.id ] = JSON.parse( JSON.stringify( scores ) );

        } else {

            delete pending[ behaviour.id ];

        }
        this.setState( { pending } );
        
    }
    componentClassName() {

        const { role, behaviour } = this.state;
        const names = [ "team-update" ];
        if ( role ) { names.push ( "role-chosen" ); }
        if ( behaviour ) { names.push( "behaviour-chosen" ); }
        return names.join( " " );
        
    }
    render() {

        const hasPending = this.state.pending && ( Object.keys( this.state.pending ).length > 0 );
        return <div className={this.componentClassName()}>

            <h1>
                
                Assess team performance
                <NavButtonLeft to="/team" text="Back"><GoLeft /></NavButtonLeft>

            </h1> 
            <div className={`pending-events${hasPending ? " pending-events-populated" : "" }`}>

                <PendingChanges pending={ this.state.pending } behaviours={ behaviours } />
                
            </div>
            <div className="picker role-picker">

                <h2>Role</h2>
                <Menu   items={ roles } 
                        template={ roleTemplate }
                        onChange={ this.handleRoleChange.bind( this ) }
                        chosen={ this.state.role }
                        decorate={ decorateMenuClasses } />
                
            </div>
            { !this.state.role ? null : <div className="picker behaviour-picker">

                <h2>Behaviour</h2>
                <Menu   items={ this.state.behaviours }
                        template={ behaviourTemplate }
                        onChange={ this.handleBehaviourChange.bind( this ) }
                        chosen={ this.state.behaviour }
                        decorate={ decorateMenuClasses } />

            </div> }
            { !this.state.behaviour ? null : <div className="picker">
            
                <h2>Assessment</h2>
                <Scoring    target={ this.state.behaviour }
                            scorees={ this.props.team.map( x => ( { ...x, score: 0 } ) ) }
                            handleChange={ this.handleScoringChange.bind( this ) } />

            </div> }

        </div>;

    }

}

export default TeamUpdate;