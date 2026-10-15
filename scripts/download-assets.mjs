import { readFile, mkdir, writeFile, access } from 'node:fs/promises';

const directory = new URL('../public/assets/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('manifest.json', directory), 'utf8'));
await mkdir(directory, { recursive: true });
let failures = 0;
for (const [name, asset] of Object.entries(manifest)) {
  const destination = new URL(asset.file, directory);
  try {
    await access(destination);
    console.log(`${name}: arquivo local já existe`);
    continue;
  } catch { /* Download missing files only. */ }
  try {
    const response = await fetch(asset.url, { signal: AbortSignal.timeout(20000) });
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) {
      throw new Error(`resposta inválida: ${response.status}`);
    }
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.length < 1000) throw new Error('imagem incompleta');
    await writeFile(destination, bytes);
    console.log(`${name}: salvo (${Math.round(bytes.length / 1024)} KB)`);
  } catch (error) {
    failures++;
    console.error(`${name}: ${error.message}`);
  }
}
if (failures) process.exitCode = 1;
