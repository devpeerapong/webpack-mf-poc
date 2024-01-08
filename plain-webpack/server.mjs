import Fastify from "fastify";
import view from "@fastify/view";
import ejs from "ejs";
import fstatic from "@fastify/static";
import { parseArgs } from "node:util";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "@fastify/cors";

const {
  values: { port = "4003" },
} = parseArgs({
  options: { port: { type: "string", short: "p" } },
});
const __dirname = dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors);
fastify.register(view, {
  engine: { ejs },
});
fastify.register(fstatic, {
  root: join(__dirname, "public"),
  prefix: "/public/",
});

fastify.get("/", (request, response) => {
  response.view("/templates/index.ejs");
});

fastify.listen({ port });
