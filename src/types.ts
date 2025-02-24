import { z } from "zod";

const transactionStatuses = ["loading", "error", "completed"] as const;
export const transactionStatusSchema = z.enum(transactionStatuses);
export type TransactionStatus = z.infer<typeof transactionStatusSchema>;
export type Theme = "light" | "dark";

export const validUsers = ["Brett", "Vika"] as const;
export const userSchema = z.enum(validUsers);
export type User = z.infer<typeof userSchema>;

export interface Transaction {
	amount: number;
	category: string;
	date: Date;
	description: string;
	id: number;
	user: User;
	status: TransactionStatus;
}
