const path = require( "path" );
const webpack = require( "webpack" );
const shared = require( "./webpack.shared.js" );

module.exports = [ {

    mode: "development",
    devServer: {

        contentBase: "./docs",
        hot: true

    },
    entry: {
        
        "live-example": "./src/live-example.js",
        "main": "./src/client.js"

    },
    output: {
    
        filename: `[name].js`,
        path: path.resolve( __dirname, "docs" )
    
    },
    module: {
    
        rules: shared.rules
      
    },
    externals: shared.externals,
    plugins: [
    
        new webpack.NamedModulesPlugin()
    
    ]

} ];