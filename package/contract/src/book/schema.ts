import z from "zod";
import { type DeepPartial, type Result, selectable } from "../common.ts";
import type * as Interface from "@ics/database/interface";

export const Create = selectable<
	Interface.Book,
	Result<
		Interface.Book,
		{
			name: true;
			grabbed_from: true;
			authors: [{ _id: true }];
		}
	>
>(
	z.object(
		{
			name: z.string(),
			grabbed_from: z.string(),
			authors: z.array(z.object({
				_id: z.string().describe("id"),
			})),
		},
	),
);

export const Read = selectable<
	Interface.Book,
	| Result<Interface.Book, { _id: true }>
	| DeepPartial<
		Result<
			Interface.Book,
			{
				name: true;
				length: true;
				cover: true;
				description: true;
				grabbed_from: true;
				authors: [{ _id: true; name: true }];
				chapters: [{ _id: true; name: true }];
				publishers: [{ _id: true; name: true }];
			}
		>
	>
>(z.union([
	z.object({ _id: z.string() }),
	z.object({
		name: z.string().optional(),
		length: z.number().optional(),
		cover: z.string().optional(),
		description: z.string().optional(),
		grabbed_from: z.string().optional(),
		authors: z.array(
			z.object({ _id: z.string(), name: z.string().optional() }),
		).optional(),
		chapters: z.array(
			z.object({ _id: z.string(), name: z.string().optional() }),
		).optional(),
		publishers: z.array(
			z.object({ _id: z.string(), name: z.string().optional() }),
		).optional(),
	}),
]));

export const Update = selectable<
	Interface.Book,
	DeepPartial<Result<Interface.Book, "*">>
>(
	z.any(),
);

export const Delete = selectable<
	Interface.Book,
	Result<Interface.Book, { _id: true }>
>(
	z.object({ _id: z.string() }),
);
