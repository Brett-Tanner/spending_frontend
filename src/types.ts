export type TransactionStatus =
	| "inactive"
	| "active"
	| "loading"
	| "error"
	| "success";

export interface Transaction {
	amount: number;
	category: string;
	date: Date;
	description: string;
	id: number;
	user: string;
	status: TransactionStatus;
}

export type User = "Brett" | "Vika";
export const validUsers: User[] = ["Brett", "Vika"];
