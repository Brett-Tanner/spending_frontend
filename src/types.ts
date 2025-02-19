export type TransactionStatus = "loading" | "error" | "completed";

export interface Transaction {
	amount: number;
	category: string;
	date: Date;
	description: string;
	id: number;
	user: User;
	status: TransactionStatus;
}

export type User = "Brett" | "Vika" | "Steven";
export const validUsers: User[] = ["Brett", "Vika"];
