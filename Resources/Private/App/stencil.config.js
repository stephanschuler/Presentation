exports.config = {
    namespace: 'presentation',
    outputTargets: [
        {
            type: 'www',
            serviceWorker: false,
            dir: '../../Public/App',
            buildDir: '.'
        }
    ],
    bundles: [
        {
            components: ['presentation-container', 'presentation-slide']
        }
    ],
    globalStyle: [
        'src/globals/default.css'
    ]
};

exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
};