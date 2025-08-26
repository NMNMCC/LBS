import { implement } from "@orpc/server";
import { Tag } from "contract";
import type { Client } from "gel";

const os = implement(Tag).$context<{
	database: Client;
}>();

os.Create.handler(async ({ input: { parameter, select }, context }) => {
	parameter;

	context.database.querySingle(``);
});
