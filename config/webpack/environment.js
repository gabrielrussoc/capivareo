const { environment } = require('@rails/webpacker')

const FlowWebpackPlugin = require('flow-webpack-next-plugin')
 
environment.plugins.prepend(
    'FlowWebpack',
    new FlowWebpackPlugin({
        failOnError: true,
        failOnErrorWatch: false,
        reportingSeverity: 'error',
        printFlowOutput: true,
        flowPath: require.main.require('flow-bin'),
        flowArgs: ['--color=always'],
        verbose: false,
        callback: (result) => {}
    })
)

module.exports = environment
