import type { Transaction } from "../types";

export const mockTransactions: Transaction[] = [
	{
		category: "Entertainment",
		date: new Date(),
		id: 1,
		description: "Elden Ring",
		user: "Brett",
		amount: 9800,
		status: "completed",
	},
	{
		category: "Eating out",
		date: new Date(new Date().setDate(new Date().getDate() - 1)),
		id: 2,
		description: "Cicada",
		user: "Vika",
		amount: 23000,
		status: "completed",
	},
	{
		category: "Super long category oh my god why this is so big",
		date: new Date(),
		id: 3,
		description: "Super long description oh my god why this is",
		user: "Vika",
		amount: 250000,
		status: "completed",
	},
	{
		category: "Entertainment",
		date: new Date(new Date().setDate(new Date().getDate() - 1)),
		id: 4,
		description: "Steam Deck 2",
		user: "Brett",
		amount: 9800,
		status: "completed",
	},
];

export const mockCategories = [
	"Food",
	"Eating Out",
	"Travel",
	"Rent",
	"Household Costs",
];
