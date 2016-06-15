{
    "plugins": [
        "lasso-less"
    ],
    "outputDir": "static${prefix}",
    "fingerprintsEnabled": true,
    "urlPrefix": "//${static_domain}${prefix}",
    "minify": true,
    "resolveCssUrls": true,
    "bundlingEnabled": true,
    "bundles": [
        {
            "name": "common",
            "dependencies": [
                "require: jquery",
                "require: ./src/views/js/bootstrap.js"
            ]
        }
    ]
}
