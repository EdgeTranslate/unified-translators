"use strict";
const path = require("path");

module.exports = {
    entry: {
        "/index": "./src/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist"),
        library: "unified-translators",
        libraryExport: "",
        libraryTarget: "umd"
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            translators: path.resolve(__dirname, "../src/translators")
        }
    },
    node: {
        fs: "empty"
    },
    mode: "production"
};
