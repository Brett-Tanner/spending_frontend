type TransactionStatus = "active" | "loading" | "error" | "success";

export interface Transaction {
	amount: number;
	category: string;
	date: Date;
	description: string;
	id: number;
	user: string;
	status: TransactionStatus;
}
