# Expense Tracker CLI

A simple Command Line Interface (CLI) application built with Node.js to manage and track your daily expenses. This application stores data locally in a JSON file and allows you to export your data to CSV format.

## 🚀 Features

- **Add Expenses**: Track new expenses with a description and amount.
- **Update/Delete**: Easily modify or remove existing records by ID.
- **View All**: List all expenses in a readable table format.
- **Summarize**: 
    - View total spending across all records.
    - Filter summary by a specific month.
- **Export**: Save your data to a `.csv` file for use in Excel or Google Sheets.
- **Local Storage**: Data persists in an `expense.json` file.

---

## 🛠️ Installation

1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. **Clone/Download**: Save the script (e.g., `index.js`) to a folder.
3. **Initialize**: No external npm packages are required as this uses the native Node.js `fs` module.

---

## 💻 Usage

Run the application using the following commands:

### 1. Add an Expense
```bash
node index.js add --description "Lunch" --amount 20
```

### 2. List All Expenses
```bash
node index.js list
```

### 3. Update an Expense
```bash
node index.js update --id 171583210 --description "Updated Lunch" --amount 25
```

### 4. Delete an Expense
```bash
node index.js delete --id 171583210
```

### 5. View Summary
**Total Summary:**
```bash
node index.js summary
```

**Summary by Month (e.g., August):**
```bash
node index.js summary --month 8
```

### 6. Export to CSV
```bash
node index.js export expenses.csv
```

---

## 📂 Data Structure

The app stores data in `expense.json`. Each entry follows this format:

```json
{
  "ID": 1715872145000,
  "Date": "2024-05-16",
  "Description": "Coffee",
  "Amount": 4.5
}
```

- **ID**: A unique timestamp generated at the moment of creation.
- **Date**: Automatically captured in `YYYY-MM-DD` format.

---

## 📝 Technical Notes
- **Search Complexity**: Searching for an expense by ID is $O(n)$ using the `.find()` method.
- **Storage**: Uses `fs.writeFileSync` to ensure data is saved immediately after every change.
- **CSV Handling**: The export function safely handles descriptions containing commas by wrapping them in double quotes.

## Project Link
https://roadmap.sh/projects/expense-tracker
## 📜 License
This project is open-source and free to use.
