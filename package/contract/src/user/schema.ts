import z from "zod";
import { type DeepPartial, type Result, selectable } from "../common.ts";
import type * as Interface from "@ics/database/interface";

export const Create = selectable<
	Interface.User,
	Result<
		Interface.User,
		{
			name: true;
			email: true;
		}
	>
>(
	z.object(
		{
			name: z.string(),
			email: z.email(),
		},
	),
);

export const Read = selectable<
	Interface.User,
	| Result<Interface.User, { _id: true }>
	| DeepPartial<
		Result<
			Interface.User,
			{
				name: true;
				email: true;
				description: true;
				authors: [{ _id: true; name: true }];
				friends: [{ _id: true; name: true }];
			}
		>
	>
>(z.union([
	z.object({ _id: z.string() }),
	z.object({
		name: z.string().optional(),
		email: z.string().optional(),
		description: z.string().optional(),
		authors: z.array(
			z.object({ _id: z.string(), name: z.string().optional() }),
		).optional(),
		friends: z.array(
			z.object({ _id: z.string(), name: z.string().optional() }),
		).optional(),
	}),
]));

export const Update = selectable<
	Interface.User,
	DeepPartial<Result<Interface.User, "*">>
>(
	z.any(),
);

export const Delete = selectable<
	Interface.User,
	Result<Interface.User, { _id: true }>
>(
	z.object({ _id: z.string() }),
);
