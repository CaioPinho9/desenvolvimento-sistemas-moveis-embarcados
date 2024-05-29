const { spawn } = require('child_process');

const apps = [
    { name: 'cadastro_acesso', port: 8081 },
    { name: 'cadastro_cancela', port: 8082 },
    { name: 'cadastro_creditos', port: 8083 },
    { name: 'cadastro_usuario', port: 8084 },
    { name: 'cadastro_vagas', port: 8085 },
    { name: 'gateway', port: 8080 }
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
