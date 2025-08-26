import z from "zod";
import { type DeepPartial, type Result, selectable } from "../common.ts";
import type * as Interface from "@ics/database/interface";

export const Create = selectable<
	Interface.Author,
	Result<
		Interface.Author,
		{
			name: true;
		}
	>
>(
	z.object(
		{
			name: z.string(),
		},
	),
);

export const Read = selectable<
	Interface.Author,
	| Result<Interface.Author, { _id: true }>
	| DeepPartial<
		Result<
			Interface.Author,
			{
				name: true;
				description: true;
				books: [{ _id: true; name: true }];
			}
		>
	>
>(z.union([
	z.object({ _id: z.string() }),
	z.object({
		name: z.string().optional(),
		description: z.string().optional(),
		books: z.array(
			z.object({
				_id: z.string(),
				name: z.string().optional(),
			}),
		).optional(),
	}),
]));

export const Update = selectable<
	Interface.Author,
	DeepPartial<Result<Interface.Author, "*">>
>(
	z.any(),
);

export const Delete = selectable<
	Interface.Author,
	Result<Interface.Author, { _id: true }>
>(
	z.object({ _id: z.string() }),
);
