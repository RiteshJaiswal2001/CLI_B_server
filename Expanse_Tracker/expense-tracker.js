const fs = require("fs");
const args = process.argv.slice(2);
const FILE_NAME = "expense.json"; // Using .json is better for structured data

const command = args[0];
const expenses = loadExpenses();

const commands = {
  add: add_expense,
  update: update_expense,
  delete: delete_expense,
  list: listAll_expense,
  summary: summaryOf_expense,
  export_to_csv: export_To_CSV_File,
};

if (commands[command]) {
  commands[command](expenses);
} else {
  console.log("Unknown command. Use: add, update, delete, list, summary");
}

// Add expense categories and allow users to filter expenses by category.

// Allow users to set a budget for each month and show a warning when the user exceeds the budget.


function loadExpenses() {
  if (!fs.existsSync(FILE_NAME)) return [];
  const data = fs.readFileSync(FILE_NAME, "utf8");
  // console.log(data);

  return data ? JSON.parse(data) : [];
}

// Helper to save data
function saveExpenses(expenses) {
  fs.writeFileSync(FILE_NAME, JSON.stringify(expenses, null, 2));
}

function add_expense(expense_list) {
  // expense-tracker add --description "Lunch" --amount 20
  const descIdx = args.indexOf("--description");
  const amtIdx = args.indexOf("--amount");

  if (descIdx === -1 || amtIdx === -1) {
    console.log("Error: Please provide --description and --amount");
    return;
  }

  const description = args[descIdx + 1];
  const amount = parseFloat(args[amtIdx + 1]);

  const newExpense = {
    ID: Date.now(), // Added ()
    Date: new Date().toISOString().split("T")[0],
    Description: description,
    Amount: amount,
  };

  expense_list.push(newExpense);
  saveExpenses(expense_list);
  console.log(`Expense added successfully (ID: ${newExpense.ID})`);
}

function update_expense(expense_list) {
  // Expected: update --id 1 --description "New"
  const idIdx = args.indexOf("--id");
  if (idIdx === -1) {
    console.log("Error: --id is required to update.");
    return;
  }

  const id = parseInt(args[idIdx + 1]);
  const expense = expense_list.find((item) => item.ID === id);

  if (!expense) {
    console.log("Error: Expense ID not found.");
    return;
  }

  const descIdx = args.indexOf("--description");
  const amtIdx = args.indexOf("--amount");

  if (descIdx !== -1) expense.Description = args[descIdx + 1];
  if (amtIdx !== -1) expense.Amount = parseFloat(args[amtIdx + 1]);

  saveExpenses(expense_list);
  console.log(`Expense ${id} updated successfully.`);
}

function delete_expense(expense_list) {
  const idIdx = args.indexOf("--id");
  const id = parseInt(args[idIdx + 1]);

  const initialLength = expense_list.length;
  const filtered = expense_list.filter((item) => item.ID !== id);

  if (filtered.length === initialLength) {
    console.log("Error: ID not found.");
    return;
  }

  saveExpenses(filtered);
  console.log("Expense deleted successfully.");
}

function listAll_expense(expense_list) {
  console.log("ID          Date        Description          Amount");
  expense_list.forEach((item) => {
    console.log(
      `${item.ID}  ${item.Date}  ${item.Description.padEnd(20)} $${item.Amount}`,
    );
  });
}

function summaryOf_expense(expense_list) {
  // Check if a specific month is requested: summary --month 8
  const monthIdx = args.indexOf("--month");
  let list = expense_list;

  if (monthIdx !== -1) {
    const month = parseInt(args[monthIdx + 1]);
    list = expense_list.filter((item) => {
      const itemMonth = new Date(item.Date).getMonth() + 1;
      return itemMonth === month;
    });
    console.log(`Summary for month ${month}:`);
  }

  const total = list.reduce((sum, item) => sum + item.Amount, 0);
  console.log(`Total expenses: $${total}`);
}

function export_To_CSV_File(expense_list) {
  if (expense_list.length === 0) {
    console.log("No expenses to export.");
    return;
  }

  const output_File = args[1] || "expenses.csv";
  csv = expense_list.map((row) => Object.values(row));
  csv.unshift(Object.keys(expense_list[0]));
  const csv_data = `"${csv.join('"\n"').replace(/,/g, '","')}"`;

  console.log(csv_data);
  console.log(output_File);

  // saveExpenses(csv_data,output_File)
  try {
    fs.writeFileSync(output_File, csv_data);
  } catch (error) {
    console.log("Failed to import csv", error);
  }
  console.log(`Expense is succesfully imported to ${output_File} file.`);
}
