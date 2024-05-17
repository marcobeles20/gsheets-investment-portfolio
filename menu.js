function onOpen() 
{
  SpreadsheetApp.getUi().createMenu('Quick Actions')
    .addItem('Log Net Worth', 'log_net_worth')
    .addItem('Save Latest Prices', 'save_latest_prices')
    .addToUi();
}