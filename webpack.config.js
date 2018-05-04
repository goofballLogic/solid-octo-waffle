const path = require( "path" );
const { version } = require('./package.json');

module.exports = {

    entry: "./src/client.js",
    output: {
    
        filename: `[name].${version}.js`,
        path: path.resolve( __dirname, "dist" )
    
    },
    module: {
    
        rules: [
        
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        
        ]
      
    }

};