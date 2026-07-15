const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = __dirname;
const CONFIG_PATH = path.join(PROJECT_DIR, 'sea-config.json');
const BLOB_PATH = path.join(PROJECT_DIR, 'sea-prep.blob');
const EXE_OUTPUT = path.join(PROJECT_DIR, 'rpg-decrypter.exe');

console.log('=== RPG Decrypter Single Executable Compiler ===');

try {
  // 1. Write sea-config.json
  console.log('(1/5) Creating SEA configuration...');
  const config = {
    main: path.join(PROJECT_DIR, 'server.js'),
    output: BLOB_PATH
  };
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));

  // 2. Generate the SEA blob
  console.log('(2/5) Compiling JS code into binary blob...');
  execSync('node --experimental-sea-config sea-config.json', { stdio: 'inherit' });

  // 3. Copy node.exe to target path
  console.log('(3/5) Copying Node.js runtime environment...');
  const nodeExePath = process.execPath;
  fs.copyFileSync(nodeExePath, EXE_OUTPUT);
  console.log(`Copied: ${nodeExePath} -> ${EXE_OUTPUT}`);

  // 4. Inject the blob into the EXE
  console.log('(4/5) Injecting blob into the executable using postject...');
  // Note: NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 is the required sentinel fuse for Node.js SEA
  const cmd = `npx -y postject rpg-decrypter.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`;
  console.log(`Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });

  // 5. Cleanup
  console.log('(5/5) Cleaning up temporary files...');
  if (fs.existsSync(CONFIG_PATH)) fs.unlinkSync(CONFIG_PATH);
  if (fs.existsSync(BLOB_PATH)) fs.unlinkSync(BLOB_PATH);

  console.log('\n=============================================');
  console.log(' SUCCESS! rpg-decrypter.exe built successfully.');
  console.log(` Output location: ${EXE_OUTPUT}`);
  console.log('=============================================');

} catch (err) {
  console.error('\n=============================================');
  console.error(' BUILD FAILED!');
  console.error(err.message);
  console.error('=============================================');
  process.exit(1);
}
