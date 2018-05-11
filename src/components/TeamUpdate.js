import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Scoring } from "tc2-react-good-bad-tracker";
import { NavButtonLeft } from "./Material";
import GoLeft from "../svg/go-left.svg";
import PendingChanges from "./PendingChanges";

import "./TeamUpdate.css";

function decorateMenuClasses( className ) {

    switch( className ) {

        case "choose":
        case "cancel":
            return `${className} btn primary btn--small`;
        default:
            return className;

    }

}
const today = () => ( new Date() ).toISOString().substring( 0, 10 );
class TeamUpdate extends Component {
    
    constructor() {

        super();
        this.state = { date: today() };

    }
    handleDateChange( e ) {

        this.setState( { date: e.target.value || today() } );

    }
    handleRoleChange( e, role ) {

        const { behaviours } = this.props;
        if ( this.state.role && role ) { return e.preventDefault(); }
        const roleBehaviours = role ? behaviours.filter( x => x.roleId === role.id ) : undefined;
        this.setState( { 

            role, 
            behaviours: roleBehaviours,
            behaviour: undefined

         } );

    }
    handleBehaviourChange( e, behaviour ) {

        if ( this.state.behaviour && behaviour ) { return e.preventDefault(); }
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
    selectedBehaviourScores() {

        const { behaviour, pending = {} } = this.state;
        const selected = pending[ behaviour.id ] || {}
        return selected;

    }
    handleSave( e ) {

        const { pending, date = today() } = this.state;
        const { behaviours, team, saveUpdates, history } = this.props;
        const updates = [];
        for( const behaviourId of Object.keys( pending ) ) {

            const behaviour = behaviours.find( b => b.id === behaviourId );
            if ( !behaviour ) { console.error( "Behaviour missing", behaviourId, behaviours ); continue; }
            const pendingForBehaviour = pending[ behaviourId ];
            for( const userId of Object.keys( pendingForBehaviour ) ) {

                const user = team.find( u => u.id === userId );
                if ( !user ) { console.error( "User missing", userId, team ); continue; }
                const isUp = pendingForBehaviour[ userId ] === "up";
                const isDown = pendingForBehaviour[ userId ] === "down";
                const score = isUp ? behaviour.upScore : isDown ? -behaviour.downScore : undefined;
                const description = `${user.name} ${isDown ? "did not succeed" : "succeeded" }: ${behaviour.title}`;
                updates.push( { when: date, behaviour: behaviourId, user: userId, score, description } );

            }

        }
        this.setState( { saving: true } );
        saveUpdates( updates ).then( () => {

            history.push( "/team" );

        } );

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
        const { behaviours, behaviourTemplate, team, roles, roleTemplate } = this.props;
        return <div className={this.componentClassName()}>
            { this.state.saving ? <div className="team-update-saving">Saving...</div> : null }
            <h1>
                
                Assess team performance
                <NavButtonLeft to="/team" text="Back"><GoLeft /></NavButtonLeft>

            </h1> 
            <div className={`pending-events${hasPending ? " pending-events-populated" : "" }`}>

                <PendingChanges pending={ this.state.pending } behaviours={ behaviours } handleSave={ this.handleSave.bind( this )} />
                
            </div>
            <div className="picker">

                <h2>When</h2>
                <div>

                    <input type="date" onChange={this.handleDateChange.bind( this )} value={this.state.date || today()} />

                </div>

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
                <div>
                
                    <Scoring    target={ this.state.behaviour }
                                scorees={ team.map( x => ( { ...x, score: 0 } ) ) }
                                selected={ this.selectedBehaviourScores() }
                                handleChange={ this.handleScoringChange.bind( this ) } />
                   
                </div>

            </div> }

        </div>;

    }

}

export default TeamUpdate;