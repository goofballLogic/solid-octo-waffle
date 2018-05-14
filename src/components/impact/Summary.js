import React from "react";

import "./Summary.css";

import GoRight from "../../svg/go-right.svg";
import { DisabledButtonRight } from "../Material";

const Summary = () => <article className="impact-summary">

    <h1>

        Impact assessments
        <DisabledButtonRight to="/impact" text="Open"><GoRight /></DisabledButtonRight>

    </h1>
    <table>

        <tbody>

            <tr>

                <td>

                    <div class="led-box"><div class="led-green"></div></div>

                </td>
                <td>Automation of calendar synchronisation</td>
                <td>92%</td>

            </tr>
            <tr>

                <td>

                    <div class="led-box"><div class="led-off"></div></div>

                </td>
                <td>Bilateral complaint resolution</td>
                <td>55%</td>

            </tr>
            <tr>

                <td>

                    <div class="led-box"><div class="led-off"></div></div>

                </td>
                <td>Correctly setting customer expectations</td>
                <td>55%</td>

            </tr>
            <tr>

                <td>

                    <div class="led-box"><div class="led-red"></div></div>

                </td>
                <td>Publication of ratings</td>
                <td>39%</td>

            </tr>
            <tr>

                <td>

                    <div class="led-box"><div class="led-red"></div></div>

                </td>
                <td>Achieving top rankings on Whodoo.com</td>
                <td>32%</td>

            </tr>

        </tbody>

    </table>

    <h2>Assessment progress</h2>
    <div className="impact-progress">

        &nbsp;

    </div>

</article>;

export default Summary;