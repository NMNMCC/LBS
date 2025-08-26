import z from "zod";
import { type DeepPartial, type Result, selectable } from "../common.ts";
import type * as Interface from "@ics/database/interface";

export const Create = selectable<
	Interface.Tag,
	Result<
		Interface.Tag,
		{
			name: true;
			owners: [{ _id: true }];
		}
	>
>(
	z.object(
		{
			name: z.string(),
			owners: z.array(z.object({
				_id: z.string().describe("id"),
			})),
		},
	),
);

export const Read = selectable<
	Interface.Tag,
	| Result<Interface.Tag, { _id: true }>
	| DeepPartial<
		Result<
			Interface.Tag,
			{ name: true; owners: [{ _id: true; name: true }] }
		>
	>
>(z.union([
	z.object({ _id: z.string() }),
	z.object({
		name: z.string().optional(),
		owners: z.array(
			z.object({ _id: z.string(), name: z.string().optional() }),
		),
	}),
]));

export const Update = selectable<
	Interface.Tag,
	DeepPartial<Result<Interface.Tag, "*">>
>(
	z.any(),
);

export const Delete = selectable<
	Interface.Tag,
	Result<Interface.Tag, { _id: true }>
>(
	z.object({ _id: z.string() }),
);
