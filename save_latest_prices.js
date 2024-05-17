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
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(transactions_prices_sheet_name);

  const source_range = sheet.getRange(`E${transactions_prices_start_row}:E` + sheet.getLastRow());
  const target_range = sheet.getRange(`F${transactions_prices_start_row}:F` + sheet.getLastRow());

  const prices = source_range.getValues();

  for(const index in prices)
  {
    const price = prices[index][0];
    const row = Number(index) + 2;

    if(typeof(price) == "number")
      continue;

    prices[index][0] = sheet.getRange("F" + row).getValue();
  }

  target_range.setValues(prices);
}