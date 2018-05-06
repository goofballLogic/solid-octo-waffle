const path = require( "path" );
const { version } = require('./package.json');
const shared = require( "./webpack.shared.js" );
const baseConfig = require( "./webpack.config" );

module.exports = baseConfig.concat( {

    mode: "production",
    entry: "./src/client.js",
    output: {
    
        filename: `[name].${version}.js`,
        path: path.resolve( __dirname, "dist" )
    
    },
    module: {
    
        rules: shared.rules
      
    },
    externals: shared.externals

} );