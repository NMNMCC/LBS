import { oc } from "@orpc/contract";
import * as Schema from "./schema.ts";

export const [Create, Read, Update, Delete] = [
	oc.input(Schema.Create),
	oc.input(Schema.Read),
	oc.input(Schema.Update),
	oc.input(Schema.Delete),
];
