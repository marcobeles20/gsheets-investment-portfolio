/*
  WARNING: DO NOT MAKE CHANGES DIRECTLY IN THE GOOGLE APPS SCRIPT EDITOR.
  
  This project is managed through a GitHub repository. Any changes to the code 
  should be made in the repository, not directly in the Google Apps Script interface.
  
  GitHub Repository: https://github.com/marcobeles20/gsheets-investment-portfolio
*/

function create_log_net_worth_trigger() 
{
  const trigger_name = log_net_worth_trigger;

  delete_trigger(trigger_name);

  ScriptApp.newTrigger(trigger_name)
    .timeBased()
    .everyMinutes(30)
    .create();
}

function log_net_worth()
{
  const net_worth_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(net_worth_sheet_name);
  const net_worth_log_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(net_worth_log_sheet_name);

  const timezone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
  const date = Utilities.formatDate(new Date, timezone, "MMM d, yyyy");

  const owner = net_worth_sheet.getRange(net_worth_owner_cell).getValue();
  const cash = net_worth_sheet.getRange(net_worth_cash_cell).getValue();
  const debt_payable = net_worth_sheet.getRange(net_worth_debt_payable_cell).getValue();
  const debt_receivable = net_worth_sheet.getRange(net_wroth_debt_receivable_cell).getValue();
  const equity = net_worth_sheet.getRange(net_worth_equity_cell).getValue();
  const fixed = net_worth_sheet.getRange(net_worth_fixed_cell).getValue();
  const deposit = net_worth_sheet.getRange(net_worth_deposit_cell).getValue();
  const net_worth = net_worth_sheet.getRange(net_worth_net_worth_cell).getValue();

  if(typeof(net_worth) != "number")
    return;

  let new_entry = [
    [date, owner, cash, debt_receivable, equity, fixed, deposit, debt_payable, net_worth]
  ];

  for(var row = net_worth_log_start_row; ; row++)
  {
    const log_date_cell = net_worth_log_sheet.getRange(
      row,
      net_worth_log_columns['date']
    );
    const log_owner_cell = net_worth_log_sheet.getRange(
      row,
      net_worth_log_columns['owner']
    );

    const log_date = Utilities.formatDate(new Date(log_date_cell.getValue()), timezone, "MMM d, yyyy");
    const log_owner = log_owner_cell.getValue();
  
    if(!log_date_cell.isBlank())
    {
      if(log_date != date) // If log date is not today
        continue;

      if(log_owner != owner && !log_owner_cell.isBlank()) // If log_owner is not owner and is not blank
        continue; // Otherwise, replace the log entry if log_owner is owner
      
      net_worth_log_sheet.getRange(
        row,
        1,
        1,
        net_worth_log_sheet.getLastColumn()
      ).setValues(new_entry);
      break;
    }
    else
    {
      var new_log_entry_range = net_worth_log_sheet.getRange(
        row,
        1,
        1,
        net_worth_log_sheet.getLastColumn()
      );

      if(row > net_worth_log_sheet.getMaxRows())
      {
        net_worth_log_sheet.insertRowAfter(row - 1);

        new_log_entry_range.setBorder(
          true, true, true, true, true, true, "white", SpreadsheetApp.BorderStyle.SOLID
        );
      }

      new_log_entry_range.setValues(new_entry);
      break;
    }
  }
}