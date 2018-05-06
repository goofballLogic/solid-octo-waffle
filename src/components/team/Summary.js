import React from "react";
import { Link } from "react-router-dom";
import { TimeSeriesGraph, TimeSeriesStreaks, sequentialUpStreakSums } from "tc2-react-time-series-graph";
import moment from "moment";
import "./Summary.css";

const simpleDateFormat = x => moment( new Date( x ) ).format( "dddd, MMM Do" );
const elaborateDateFormat = x => moment( new Date( x ) ).format( "dddd, MMMM Do, YYYY" );
const Summary = ( { data, series, events } ) => <article className="team-summary">

    <header>

        <h2>Team performance</h2>
        <nav>
            <Link to="/team">Open</Link>
        </nav>

    </header>
    <h3>Improvment over time</h3>
    <div className="graph">

        <TimeSeriesGraph
            data={data} 
            series={series}
            formatTickDate={ simpleDateFormat }
            formatTooltipDate={ elaborateDateFormat } />

    </div>
    <h3>Biggest continuous improvment</h3>
    <div className="graph">

        <TimeSeriesStreaks
            data={data}
            series={series}
            strategy={sequentialUpStreakSums} />

    </div>
    <h3>Longest period of improvement</h3>
    <div className="graph">

        <TimeSeriesStreaks
            data={data}
            series={series} />

    </div>

</article>;

export default Summary;