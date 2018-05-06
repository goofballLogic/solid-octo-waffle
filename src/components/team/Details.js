import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import {

    TimeSeriesGraph,
    TimeSeriesStreaks,
    TimeSeriesTable,
    sequentialUpStreakSums

} from "tc2-react-time-series-graph";
import format from "date-fns/format";

import "./Details.css";

const simpleDateFormat = x => format( new Date( x ), "dddd, MMM Do" );
const elaborateDateFormat = x => format( new Date( x ), "dddd, MMMM Do, YYYY" );

const Details = ( { data, events, series, selectWhen } ) => <article className="team-details">
      
    <h2>Improvment over time</h2>
    <div className="graph">

        <TimeSeriesGraph
            data={data} 
            series={series}
            formatTickDate={ simpleDateFormat }
            formatTooltipDate={ elaborateDateFormat } />

    </div>
    <div className="graph-enhancements">

        <div>

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
        
        </div>
        <div className="event-listing">

            <h2>Records</h2>
            <div className="graph">

                <TimeSeriesTable selectWhen={selectWhen} data={data} series={series} />

            </div>

        </div>

    </div>

</article>;

class DetailsContainer extends PureComponent {

    constructor() {

        super();
        this.state = { };

    }

    selectWhen( when ) {


        const selected = this.state.selected || [];
        if( !~selected.indexOf( when ) ) { selected.push( when ); }
        this.setState( { selected } );

    }

    decorateData() {

        const selected = this.state.selected || [];
        return this.props.data.map( x => ( { 
            
            ...x,
            selected: !!~selected.indexOf( x.when )
        
        } ) );

    }

    render() {

        return <Details {...this.props} 
            data={ this.decorateData() } 
            selectWhen={ when => this.selectWhen( when ) } />

    }

}

export default DetailsContainer;