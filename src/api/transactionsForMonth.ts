import { z } from "zod";
import { transactionStatusSchema, userSchema } from "../types";

const transactionResponseSchema = z.object({
	description: z.string(),
	amount: z.number(),
	category: z.string(),
	date: z.coerce.date(),
	id: z.number(),
	user: userSchema,
	status: transactionStatusSchema,
});

export async function transactionsForMonth(date: Date) {
	const response = await fetch("http://localhost:8787/api/transactions", {
		method: "GET",
	});

	if (response.status !== 200) {
		throw new Error("Failed to fetch transactions");
	}

	return z.array(transactionResponseSchema).parse(await response.json());
}
