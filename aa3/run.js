const {spawn} = require('child_process');

const apps = [
    {name: 'app_gateway', port: 8080},
    {name: 'control_access', port: 8082},
    {name: 'control_gate', port: 8083},
    {name: 'control_credits', port: 8084},
    {name: 'control_parking', port: 8085},
    {name: 'register_user', port: 8081},
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
