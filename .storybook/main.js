module.exports = {
    "stories": [
        "../**/*.stories.mdx",
        "../**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        //"storybook-addon-next",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "storybook-addon-next"
    ],
    "framework": "@storybook/react",
    "core": {
        "builder": "webpack5",
        "disableTelemetry": true,
    }
}