import { envs } from "./config/envs";
import { Server } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  const server = new Server({
    port: envs.port,
  });
  server.start();
}
