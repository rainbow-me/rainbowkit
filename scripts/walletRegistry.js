import fs from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const QUERY =
  '?projectId=6f03d9841405db5f31e2c08d6c053749&st=appkit&sv=react-ethers-1.7.8';
const BASE_URL = 'https://api.web3modal.org/getWallets';
const ICON_BASE_URL = 'https://api.web3modal.org/getWalletImage';
const ENTRIES = 100;

async function fetchWallets() {
  const allWallets = [];
  let page = 1;

  while (true) {
    const url = `${BASE_URL}${QUERY}&page=${page}&entries=${ENTRIES}`;
    const { stdout } = await execFileAsync('curl', ['-s', '-L', url]);
    const json = JSON.parse(stdout);
    allWallets.push(...json.data);
    if (!json.nextPage) break;
    page = json.nextPage;
  }

  return allWallets;
}

async function fetchIcon(imageId, outputPath) {
  const url = `${ICON_BASE_URL}/${imageId}${QUERY}`;
  await execFileAsync('curl', ['-s', '-L', url, '-o', outputPath]);
}

async function main() {
  const wallets = await fetchWallets();
  const dir = 'packages/rainbowkit/assets/wallets';
  const iconsDir = `${dir}/icons`;
  await fs.mkdir(iconsDir, { recursive: true });
  const outputPath = `${dir}/registry.json`;
  await fs.writeFile(outputPath, `${JSON.stringify(wallets)}\n`);
  console.log(`Wrote ${wallets.length} wallets to ${outputPath}`);

  for (const wallet of wallets) {
    if (!wallet.image_id) continue;
    const iconPath = `${iconsDir}/${wallet.id}.png`;
    await fetchIcon(wallet.image_id, iconPath);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
