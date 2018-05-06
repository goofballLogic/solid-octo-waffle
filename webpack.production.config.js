const path = require( "path" );
const { version } = require('./package.json');

const baseConfig = require( "./webpack.config" );

module.exports = baseConfig.concat( {

    mode: "production",
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

} );