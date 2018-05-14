import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Scoring } from "tc2-react-good-bad-tracker";
import { NavButtonLeft } from "./Material";
import GoLeft from "../svg/go-left.svg";
import PendingChanges from "./PendingChanges";
import { hot } from "react-hot-loader";

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
    static getDerivedStateFromProps( nextProps, prevState ) {

        const team = nextProps.team.map( member => ( {

            ...member,
            score: nextProps.events.filter( evt =>

                evt.id === member.id

            ).reduce( ( sum, x ) =>

                sum + x.score

            , 0 )

        } ) );
        return { ...prevState, team };

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
    handleBehaviourChange2( e, selected ) {

        if ( this.state.behaviour2 && selected ) { return e.preventDefault(); }
        const { roles } = this.props;
        if ( !selected ) {

            this.setState( { behaviour2: selected } );

        } else {

            const scores = roles.filter( role =>

                role.behaviours.find( behaviour => behaviour.id === selected.id )

            ).map( x => ( { ...x, upScore: 1, downScore: 1 } ) );
            const behaviour2 = { ...selected, scores };
            this.setState( { behaviour2 } );

        }

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
    handleScoringChange2( scores ) {

        const { behaviour2 } = this.state;
        const pending = this.state.pending || {};
        if( scores && Object.values( scores ).filter( x => x ).length ) {

            pending[ behaviour2.id ] = JSON.parse( JSON.stringify( scores ) );

        } else {

            delete pending[ behaviour2.id ];

        }
        this.setState( { pending } );

    }
    selectedBehaviourScores() {

        const { behaviour, pending = {} } = this.state;
        const selected = pending[ behaviour.id ] || {}
        return selected;

    }
    handleSave( e ) {

        const { pending, team, date = today() } = this.state;
        const { behaviours, saveUpdates, history, roles } = this.props;
        const updates = [];
        for( const behaviourId of Object.keys( pending ) ) {

            const behaviour = behaviours.find( b => b.id === behaviourId );
            if ( !behaviour ) { console.error( "Behaviour missing", behaviourId, behaviours ); continue; }
            const pendingForBehaviour = pending[ behaviourId ];
            for( const userId of Object.keys( pendingForBehaviour ) ) {

                const user = team.find( u => u.id === userId );
                if ( !user ) { console.error( "User missing", userId, team ); continue; }
                const userBehaviourRoles = user.roles.map( roleId =>

                    roles.find( role => role.id === roleId )

                ).filter( role =>

                    role.behaviours.find( b => b.id === behaviourId )

                );
                const userBehaviourWeight = userBehaviourRoles.map( role =>

                    role.behaviours.find( b => b.id === behaviourId )

                ).map( x =>

                    x ? x.weight : 0

                ).reduce( ( a, b ) => a + b );
                const isUp = pendingForBehaviour[ userId ] === "up";
                const isDown = pendingForBehaviour[ userId ] === "down";
                const score = isUp ? userBehaviourWeight : isDown ? -userBehaviourWeight : undefined;
                const description = `${user.name} ${isDown ? "did not succeed" : "succeeded" }: ${behaviour.title} - ${userBehaviourRoles.map( x => x.title ).join( ", " )}`;
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
    calculateDelta( selected, targetScore, id ) {

        const { team } = this.state;
        if ( selected === "-" ) { return undefined; }
        const teamMember = team.find( t => t.id === id );
        if ( !~teamMember.roles.indexOf( targetScore.id ) ) { return undefined; }
        const deltaBehaviour = targetScore.behaviours.find( behaviour => behaviour.id === this.state.behaviour2.id );
        return selected === "up" ? deltaBehaviour.weight : -deltaBehaviour.weight;

    }
    render() {

        const { behaviours, behaviourTemplate, roles, roleTemplate } = this.props;
        const { team, pending, date, behaviour2 } = this.state;
        const hasPending = pending && ( Object.keys( pending ).length > 0 );
        const scorees = behaviour2 && team.filter( x =>

            x.roles.find( roleId =>

                roles.find( role =>

                    role.id === roleId

                ).behaviours.find( b =>

                    b.id === behaviour2.id

                )

            )

        );
        return <div className={this.componentClassName()}>
            { this.state.saving ? <div className="team-update-saving">Saving...</div> : null }
            <h1>

                Assess team performance
                <NavButtonLeft to="/team" text="Cancel"><GoLeft /></NavButtonLeft>

            </h1>
            <section className="scoring-area">

                <div className={`pending-events pending-events-populated" }`}>

                    <PendingChanges     pending={ pending }
                                        behaviours={ behaviours }
                                        handleSave={ this.handleSave.bind( this )}
                                        handleDateChange={ this.handleDateChange.bind( this )}
                                        date={ date || today() } />

                </div>
                <div className="behaviour-assessment">

                    <Menu   items={ behaviours }
                            template={ behaviourTemplate }
                            onChange={ this.handleBehaviourChange2.bind( this ) }
                            chosen={ behaviour2 }
                            decorate={ decorateMenuClasses } />
                    {
                        !behaviour2 ? <div /> : scorees.length

                            ? <Scoring  target={ behaviour2 }
                                        scorees={ scorees }
                                        handleChange={ this.handleScoringChange2.bind( this ) }
                                        calculateDelta={ this.calculateDelta.bind( this ) } />

                            : <div>Nobody is assigned to a role with this behaviour</div>

                    }

                </div>


            </section>

        </div>;

    }

}

export default hot( module )( TeamUpdate );

/*

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
                                scorees={ team.filter( x =>

                                    ~x.roles.indexOf( this.state.role.id )

                                ).map( x => ( {

                                    score: 0,
                                    ...x

                                } ) ) }
                                selected={ this.selectedBehaviourScores() }
                                handleChange={ this.handleScoringChange.bind( this ) } />

                </div>

            </div> }

*/