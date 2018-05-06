import React from "react";
import { Link } from "react-router-dom";
import { TimeSeriesGraph, TimeSeriesStreaks, sequentialUpStreakSums } from "tc2-react-time-series-graph";
import format from "date-fns/format";

import "./Summary.css";

const simpleDateFormat = x => format( new Date( x ), "dddd, MMM Do" );
const elaborateDateFormat = x => format( new Date( x ), "dddd, MMMM Do, YYYY" );

const Summary = ( { data, series, events } ) => <article className="team-summary">
      
    <h2>Improvment over time</h2>
    <div className="graph">

        <TimeSeriesGraph
            data={data} 
            series={series}
            formatTickDate={ simpleDateFormat }
            formatTooltipDate={ elaborateDateFormat } />

    </div>
    <h2>Biggest continuous improvment</h2>
    <div className="graph">

        <TimeSeriesStreaks
            data={data}
            series={series}
            strategy={sequentialUpStreakSums} />

    </div>
    <h2>Longest period of improvement</h2>
    <div className="graph">

        <TimeSeriesStreaks
            data={data}
            series={series} />

    </div>

</article>;

export default Summary;