import { fileURLToPath } from 'node:url';
import { spawn, fork } from 'node:child_process';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dempsPath = resolve(__dirname, '../../demps/sim/');

const dempsSpawn = spawn('./run.sh', ['--config', 'vdm-pob-vergara.config', '--outdir', 'output/vdm-pob-vergara'], {
    cwd: dempsPath,
    stdio: 'inherit',
    shell: true
})

const watcherFork = fork('watcher.mjs', {
    cwd: __dirname,
    stdio: 'inherit',
});

const processes = [
    dempsSpawn,
    watcherFork
];

const errors = [];

dempsSpawn.on('exit', (code, signal) => {
    console.log(`Child process exited with code ${code}, signal ${signal}`);
});

dempsSpawn.on('error', (err) => {
    errors.push(err.message);
});

watcherFork.on('error', (err) => {
    errors.push(err.message);
});

process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    shutdown();
});

function shutdown() {
    processes.forEach(fork => {
        fork.kill('SIGINT');
    });

    errors.forEach(err => {
        console.error(err);
    })

    process.exit(0);
}