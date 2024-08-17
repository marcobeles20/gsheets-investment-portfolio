const net_worth_sheet_name = "Net Worth";

const net_worth_owner_cell = "E2";
const net_worth_cash_cell = "M1";
const net_worth_debt_payable_cell = "E8";
const net_wroth_debt_receivable_cell = "M2";
const net_worth_equity_cell = "M3";
const net_worth_fixed_cell = "M4";
const net_worth_deposit_cell = "M5";
const net_worth_net_worth_cell = "E21";

const net_worth_log_sheet_name = "Net Worth_log";
const net_worth_log_start_iteration_row = 1000; // Set to 2 for default operation but slower runtime
const net_worth_log_start_row = net_worth_log_start_iteration_row;

const net_worth_log_columns = {
  'date':               1,
  'owner':              2,
  'cash':               3,
  'debt_receivable':    4,
  'equity':             5,
  'fixed':              6,
  'deposit':            7,
  'debt_payable':       8,
  'net_worth':          9
};

const transactions_prices_sheet_name = "Transactions_prices";
const transactions_prices_start_row = 2;

const transactions_prices_columns = {
    'account':          1,
    'ticker':           2,
    'name':             3,
    'current_price':    4,
    'price_formula':    5,
    'latest_price':     6,
    'manual_inputs':    7
};

const log_net_worth_trigger = "log_net_worth";
const save_latest_prices_trigger = "save_latest_prices";