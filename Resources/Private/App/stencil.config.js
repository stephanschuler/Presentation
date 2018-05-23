exports.config = {
    namespace: 'presentation',
    outputTargets: [
        {
            type: 'www',
            serviceWorker: false,
            dir: '../../Public/Scripts',
            buildDir: '.'
        }
    ]
};

exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
};