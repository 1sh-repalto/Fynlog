export interface Category {
  id: number;
  name: string;
  type: "income" | "expense";
  color: string;
}

export const incomeCategories: Category[] = [
  { id: 1, name: "Salary", type: "income", color: "#4CAF50" },
  { id: 2, name: "Freelance", type: "income", color: "#8BC34A" },
  { id: 3, name: "Investment", type: "income", color: "#81C784" },
  { id: 4, name: "Business", type: "income", color: "#66BB6A" },
  { id: 5, name: "Others", type: "income", color: "#4CAF50" },
];

export const expenseCategories: Category[] = [
  { id: 6, name: "Food", type: "expense", color: "#FF5722" },
  { id: 7, name: "Transport", type: "expense", color: "#FF7043" },
  { id: 8, name: "Rent", type: "expense", color: "#FF7043" },
  { id: 9, name: "Utilities", type: "expense", color: "#FFEB3B" },
  { id: 10, name: "Bills", type: "expense", color: "#FF9800" },
  { id: 11, name: "Entertainment", type: "expense", color: "#FFEB3B" },
  { id: 12, name: "Health", type: "expense", color: "#9C27B0" },
  { id: 13, name: "Shopping", type: "expense", color: "#9C27B0" },
  { id: 14, name: "Education", type: "expense", color: "#3F51B5" },
  { id: 15, name: "Miscellaneous", type: "expense", color: "#9E9E9E" },
];
