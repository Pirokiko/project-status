const {
    override,
    addBabelPlugin,
    addBundleVisualizer
} = require('customize-cra');

module.exports = override(
    addBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]
    ),
    process.env.NODE_ENV === 'production' && addBundleVisualizer()
);