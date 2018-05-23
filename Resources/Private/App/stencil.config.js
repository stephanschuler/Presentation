exports.config = {
    namespace: 'presentation',
    outputTargets: [
        {
            type: 'www',
            serviceWorker: false,
            dir: '../../Public/Scripts',
            buildDir: '.'
        }
    ],
    bundles: [
        {
            components: ['presentation-container', 'presentation-slide']
        }
    ]
};

exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
};