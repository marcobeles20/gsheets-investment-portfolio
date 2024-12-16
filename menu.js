/*
  WARNING: DO NOT MAKE CHANGES DIRECTLY IN THE GOOGLE APPS SCRIPT EDITOR.
  
  This project is managed through a GitHub repository. Any changes to the code 
  should be made in the repository, not directly in the Google Apps Script interface.
  
  GitHub Repository: https://github.com/marcobeles20/gsheets-investment-portfolio
*/

function onOpen() 
{
  SpreadsheetApp.getUi().createMenu('Quick Actions')
    .addItem('Log Net Worth', 'log_net_worth')
    .addItem('Save Latest Prices', 'save_latest_prices')
    .addToUi();
}