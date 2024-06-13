const {spawn} = require('child_process');

const apps = [
    {name: 'app_gateway', port: 8080},
    {name: 'config', port: 8081},
    {name: 'logger', port: 8082},
];

apps.forEach(app => {
    const proc = spawn('node', ['app.js'], {
        cwd: `./${app.name}`,
        env: {
            ...process.env,
            PORT: app.port
        }
    });

    proc.stdout.on('data', (data) => {
        console.log(`${app.name} stdout: ${data}`);
    });

    proc.stderr.on('data', (data) => {
        console.error(`${app.name} stderr: ${data}`);
    });

    proc.on('close', (code) => {
        console.log(`${app.name} process exited with code ${code}`);
    });
});
