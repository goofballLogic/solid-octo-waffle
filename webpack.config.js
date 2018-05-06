const path = require( "path" );
const webpack = require( "webpack" );

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
    
        rules: [
        
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        
        ]
      
    },
    externals: {

        "react": "React",
        "react-dom": "ReactDOM"

    },
    plugins: [
    
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    
    ]

} ];