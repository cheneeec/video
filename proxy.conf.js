const PROXY_CONFIG = [
    {
        context: [
            "/v1/api/**",
            "/authentication/**"
        ],
        "target": "http://localhost:8080",
        "secure": false
    }
];

module.exports = PROXY_CONFIG;