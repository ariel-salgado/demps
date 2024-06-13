import { watch } from 'chokidar';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createInterface } from 'node:readline';
import { createReadStream, writeFileSync, existsSync, mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../../demps/sim/output/');

function createWatcher(path) {
    const watcher = watch(path, {
        persistent: true,
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 1000,
            pollInterval: 100,
        },
    });

    return watcher;
}

const dirWatcher = createWatcher(outputPath);

dirWatcher.on('addDir', (path) => {
    if (path.includes('agents')) {
        const fileWatcher = createWatcher(path);

        fileWatcher.on('add', async (path) => {
            try {
                const data = [];

                const readInterface = createInterface({
                    input: createReadStream(path),
                    console: false,
                });

                readInterface.on('line', (line) => {
                    if (line.length > 0) {
                        const parsedLine = line.split(' ');
                        const lat = parsedLine[1];
                        const lng = parsedLine[2];

                        if (lat && lng) {
                            data.push({ lat, lng });
                        }
                    }
                })

                readInterface.on('close', () => {
                    const dataString = data.map(item => `${item.lat}, ${item.lng}`).join('\n');
                    const outputFilePath = `./test/${Date.now()}.txt`;

                    if (!existsSync('./test')) {
                        mkdirSync('./test', { recursive: true });
                    }

                    writeFileSync(outputFilePath, dataString);
                });
            } catch (error) {
                console.error(`Error reading file ${path}:`, error);
            }
        });
    }
})

process.on('SIGINT', () => {
    console.log('Watcher received SIGINT. Exiting...');
    dirWatcher.close().then(() => process.exit(0));
});