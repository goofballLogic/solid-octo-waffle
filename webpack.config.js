const path = require( "path" );
const { version } = require('./package.json');

module.exports = [ {

    entry: "./src/client.js",
    output: {
    
        filename: `[name].${version}.js`,
        path: path.resolve( __dirname, "dist" )
    
    },
    module: {
    
        rules: [
        
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        
        ]
      
    },
    externals: {

        "react": "React",
        "react-dom": "ReactDOM"

    }

}, {

    entry: {
        
        "live-example": "./src/live-example.js",
        "main": "./src/client.js"

    },
    output: {
    
        filename: `[name].js`,
        path: path.resolve( __dirname, "docs" )
    
    },
    module: {
    
        rules: [
        
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        
        ]
      
    },
    externals: {

        "react": "React",
        "react-dom": "ReactDOM"

    }

} ];