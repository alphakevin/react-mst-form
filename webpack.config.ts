import * as path from 'path';
import * as webpack from 'webpack';

export default function configure(env: any): Array<webpack.Configuration> {
    const isDevBuild: boolean = !(env && env.prod);
    const mode: string = process.env.NODE_ENV || 'development';
    const clientBundleOutputDir: string = './'; // './dist';
    const clientBundleConfig: webpack.Configuration & { mode: string } = {
        mode,
        stats: { modules: false },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                '@root': path.resolve('./src')
            }
        },
        entry: {
            'dist/index': './src/index.ts',
            'demo/client': './demo/client.tsx'
        },
        output: {
            filename: '[name].js',
            chunkFilename: '[name]-chunk.js',
            publicPath: '/dist/',
            path: path.join(__dirname, clientBundleOutputDir)
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: [/src/, /demo/],
                    exclude: /node_modules/,
                    use: 'ts-loader'
                }
            ]
        },
        plugins: [
            // new webpack.NamedModulesPlugin(),
            // new webpack.optimize.CommonsChunkPlugin({
            //   name: "vendor",
            //   minChunks: Infinity,
            //   filename: "vendor.bundle.js"
            // }),
            ...(isDevBuild
                ? [
                      // Plugins that apply in development builds only
                      new webpack.SourceMapDevToolPlugin({
                          filename: '[file].map', // Remove this line if you prefer inline source maps
                          moduleFilenameTemplate: path.relative(
                              clientBundleOutputDir,
                              '[resourcePath]'
                          )
                          // Point sourcemap entries to the original file locations on disk
                      })
                  ]
                : [
                      new webpack.LoaderOptionsPlugin({
                          minimize: true,
                          debug: false
                      }) // , // prod
                      //   new webpack.optimize.UglifyJsPlugin({
                      //       compress: {
                      //           warnings: false
                      //       },
                      //       comments: false,
                      //       sourceMap: false
                      //   }) // prod
                  ]),
            new webpack.DefinePlugin({
                process: {},
                'process.env': {},
                'process.env.NODE_ENV': JSON.stringify(mode),
                __DEV__: mode === 'development',
                __TEST__: mode === 'test'
            }) // prod
        ]
    };

    return [clientBundleConfig];
}
