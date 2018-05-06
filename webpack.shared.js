module.exports = {
    
    rules: [
        
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.css$/, use: [ "style-loader", "css-loader" ] },
        { test: /\.svg$/, use: [ "react-svg-loader" ] }

    ],
    externals: {

        "react": "React",
        "react-dom": "ReactDOM",
        "recharts": "Recharts"

    }

};