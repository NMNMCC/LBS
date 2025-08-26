import z from "zod";
import { type DeepPartial, type Result, selectable } from "../common.ts";
import type * as Interface from "@ics/database/interface";

export const Create = selectable<
	Interface.Chapter,
	Result<
		Interface.Chapter,
		{
			name: true;
			book: { _id: true };
		}
	>
>(
	z.object(
		{
			name: z.string(),
			book: z.object({
				_id: z.string().describe("id"),
			}),
		},
	),
);

export const Read = selectable<
	Interface.Chapter,
	| Result<Interface.Chapter, { _id: true }>
	| DeepPartial<
		Result<
			Interface.Chapter,
			{
				name: true;
				book: { _id: true; name: true };
			}
		>
	>
>(z.union([
	z.object({ _id: z.string() }),
	z.object({
		name: z.string().optional(),
		book: z.object({
			_id: z.string(),
			name: z.string().optional(),
		}).optional(),
	}),
]));

export const Update = selectable<
	Interface.Chapter,
	DeepPartial<Result<Interface.Chapter, "*">>
>(
	z.any(),
);

export const Delete = selectable<
	Interface.Chapter,
	Result<Interface.Chapter, { _id: true }>
>(
	z.object({ _id: z.string() }),
);
