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
  const source_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(net_worth_sheet_name);
  const target_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(net_worth_log_sheet_name);

  const date = new Date;
  const timezone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();

  const source_date = Utilities.formatDate(date, timezone, "MMM d, yyyy");
  const source_owner = source_sheet.getRange("E2").getValue();

  const source_cash = source_sheet.getRange("M1").getValue();
  const source_receivable = source_sheet.getRange("M2").getValue();
  const source_equity = source_sheet.getRange("M3").getValue();
  const source_fixed_income = source_sheet.getRange("M4").getValue();
  const source_debt = source_sheet.getRange("E8").getValue();
  const source_net_worth = source_sheet.getRange("E21").getValue();

  let entry = [
    [date, source_owner, source_cash, source_receivable, source_equity, source_fixed_income, source_debt, source_net_worth]
  ];

  for(var row = 2; ; row++)
  {
    const target_date = Utilities.formatDate(new Date(target_sheet.getRange("A" + row).getValue()), timezone, "MMM d, yyyy");
    const target_owner = target_sheet.getRange("B" + row).getValue();

    if(!target_sheet.getRange("A" + row).isBlank())
    {
      if(target_date != source_date) // If target date is not today
        continue;

      if(target_owner != source_owner && !target_sheet.getRange("B" + row).isBlank()) // If target_owner is not source_owner and is not blank
        continue;

      if(typeof(source_net_worth) != "number")
        return;
      
      target_sheet.getRange("A" + row + ":H" + row).setValues(entry);
      break;
    }
    else
    {
      if(typeof(source_net_worth) != "number")
      {
        source_cash = row > 2 ? target_sheet.getRange("C" + (row - 1)).getValue() : 0;
        source_receivable = row > 2 ? target_sheet.getRange("D" + (row - 1)).getValue() : 0;
        source_equity = row > 2 ? target_sheet.getRange("E" + (row - 1)).getValue() : 0;
        source_fixed_income = row > 2 ? target_sheet.getRange("F" + (row - 1)).getValue() : 0;
        source_debt = row > 2 ? target_sheet.getRange("G" + (row - 1)).getValue() : 0;
        source_net_worth = row > 2 ? target_sheet.getRange("H" + (row - 1)).getValue() : 0;

        entry = [
          [date, source_owner, source_cash, source_receivable, source_equity, source_fixed_income, source_debt, source_net_worth]
        ];
      }

      var target_range = target_sheet.getRange("A" + row + ":H" + row);

      if(row > target_sheet.getMaxRows())
      {
        target_sheet.insertRowAfter(row - 1);

        target_range.setBorder(
          true, true, true, true, true, true, "white", SpreadsheetApp.BorderStyle.SOLID
        );
      }

      target_range.setValues(entry);
      break;
    }
  }
}