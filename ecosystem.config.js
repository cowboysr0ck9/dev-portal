module.exports = {
    apps: [
        {
            name: 'dev-portal-react-js',
            script: './build/src/server.js',
            instances: 'max',
            autorestart: true,
            exec_mode: 'cluster',
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
