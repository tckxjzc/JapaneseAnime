module.exports={
    "presets": [
        ["@babel/preset-env", {
            "targets": {
                "android": "4.0",
                "ios":"8.0"
            }
        }],
        "@babel/preset-react"
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "corejs": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ],
        // ["@babel/plugin-transform-async-to-generator"],
        ["@babel/plugin-transform-object-assign"],
        ["@babel/plugin-syntax-dynamic-import"],
        ["@babel/plugin-proposal-logical-assignment-operators"],
        ["@babel/plugin-proposal-class-properties",{"loose":false}],
        ["@babel/plugin-proposal-decorators", { "legacy": true }]

    ],
    "ignore": [
    ]
}