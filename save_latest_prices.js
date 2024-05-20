function create_save_latest_prices_trigger() 
{
  const trigger_name = save_latest_prices_trigger;

  delete_trigger(trigger_name);

  ScriptApp.newTrigger(trigger_name)
    .timeBased()
    .everyMinutes(30)
    .create();
}

function save_latest_prices()
{
  const transactions_prices_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(transactions_prices_sheet_name);

  const price_formula_values = transactions_prices_sheet.getRange(
    transactions_prices_start_row,
    transactions_prices_columns['price_formula'],
    transactions_prices_sheet.getLastRow() - transactions_prices_start_row + 1
  ).getValues();

  for(const index in price_formula_values)
  {
    const price_formula = price_formula_values[index][0];
    const row = Number(index) + transactions_prices_start_row;

    // If Price Formula value is a number, do not perform changes
    if(typeof(price_formula) == "number")
      continue;

    // If Price Formula value is not a number, replace with Latest Price value
    price_formula_values[index][0] = transactions_prices_sheet.getRange(
      row,
      transactions_prices_columns['latest_price']
    ).getValue();
  }

  // Save updated values to Latest Price column
  transactions_prices_sheet.getRange(
    transactions_prices_start_row,
    transactions_prices_columns['latest_price'],
    transactions_prices_sheet.getLastRow() - transactions_prices_start_row + 1
  ).setValues(price_formula_values);
}