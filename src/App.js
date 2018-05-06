import React from "react";
import { hot } from "react-hot-loader";

import Impact from "./impact/Dashboard";
import Team from "./team/Dashboard";

const App = () => <div className="expz-ots 12">

    <Impact />
    <Team />

</div>;

export default hot(module)(App);