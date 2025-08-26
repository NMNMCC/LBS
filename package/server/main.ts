import { pino } from "pino";
const logger = pino({ level: "info" });

import { RPCHandler } from "@orpc/server/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import { os } from "@orpc/server";

const ping = os.handler(() => "ping");
const pong = os.handler(() => "pong");

const router = {
	ping,
	pong,
	nested: { ping, pong },
};

const rpcHandler = new RPCHandler(router, {
	plugins: [
		new CORSPlugin(),
	],
});

export default {
	async fetch(req, inf) {
		logger.child({ req, inf }).info("Request received");

		const { matched, response } = await rpcHandler.handle(req, {
			prefix: "/rpc",
			context: {}, // Provide initial context if needed
		});

		if (matched) {
			return response;
		}

		return new Response("Not found", { status: 404 });
	},
} satisfies Deno.ServeDefaultExport;
