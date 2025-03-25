const { spawn, spawnSync } = require('child_process');

const STUB_IMAGE = 'paradigmadigital/ecommerce-catalog-stubs:latest';
const DOCKER_COMMAND = 'docker';
const STUB_SERVER_NAME = 'ecommerce-catalog-stub-server';

try {
  spawnSync(DOCKER_COMMAND, ['rm', '-f', STUB_SERVER_NAME], { stdio: 'inherit', shell: true });
} catch (e) {
  console.log('No running Stub Server found.');
}

runIntegrationTests(() => {
  console.log("The integration tests have finished.");
});

function runIntegrationTests(callback) {
  console.log("Starting the stub server...");

  const child = spawn(DOCKER_COMMAND, ['run', '--rm', '--name', STUB_SERVER_NAME, '-p', '8080:8080', STUB_IMAGE]);

  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');

  const onDataHandler = (data) => {
    const output = data.toString();
    console.log(`[STUB SERVER] ${output.trim()}`);

    if (output.includes('Started StubRunnerApplication')) {
      console.log("Stub server is up. Running integration tests...");

      const jestProcess = spawn('npx', ['jest', '--config', 'jest.integration.config.js'], { stdio: 'inherit', shell: true });

      jestProcess.on('exit', (code) => {
        console.log(`Jest finished with exit code ${code}`);
        cleanupStubServer();
        callback();
        process.exit(code);
      });
    }
  };

  child.stdout.on('data', onDataHandler);
  child.stderr.on('data', (data) => console.error(`[STUB SERVER ERROR] ${data.toString().trim()}`));

  child.on('exit', (code) => {
    console.log(`Stub server process exited with code ${code}`);
    child.stdout.off('data', onDataHandler);
  });

  process.on('SIGINT', () => {
    console.log("\nInterrupted! Cleaning up...");
    cleanupStubServer();
    process.exit(1);
  });
}

function cleanupStubServer() {
  console.log("Stopping the stub server...");
  spawnSync(DOCKER_COMMAND, ['rm', '-f', STUB_SERVER_NAME], { stdio: 'inherit', shell: true });
}
