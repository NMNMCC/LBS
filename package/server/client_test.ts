import { hc } from "hono/client";
import { router, srv } from "./main.ts";

const client = hc<typeof router>("");

client.tag.create;
