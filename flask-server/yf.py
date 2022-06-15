from pandas_datareader import data as pdr
import yfinance as yf

watchList = []


#client side query shall recieve:
#ticker = get_ticker()
#start="2017-01-01", end="2017-04-30"
upperbound, lowerbound = 0,0

#upon initial stock call: stock ticker, standard lower and upperbounds
#upon refresh .. lower and upperbounds.. and every second with no refresh... the day, return the very latest columns 

#send back the data frame requested



yf.pdr_override() # <== that's all it takes :-)

# download dataframe




data = pdr.get_data_yahoo("SPY", start="2017-01-01", end="2017-04-30")


print(data.read())
print(data)



#watch list functionality will require a constant refresh from the api. This will work

# data = yf.download(  # or pdr.get_data_yahoo(...
#         # tickers list or string as well
#         tickers = "SPY AAPL MSFT",

#         # use "period" instead of start/end
#         # valid periods: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max
#         # (optional, default is '1mo')
#         period = "ytd",

#         # fetch data by interval (including intraday if period < 60 days)
#         # valid intervals: 1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo
#         # (optional, default is '1d')
#         interval = "1m",

#         # group by ticker (to access via data['SPY'])
#         # (optional, default is 'column')
#         group_by = 'ticker',

#         # adjust all OHLC automatically
#         # (optional, default is False)
#         auto_adjust = True,

#         # download pre/post regular market hours data
#         # (optional, default is False)
#         prepost = True,

#         # use threads for mass downloading? (True/False/Integer)
#         # (optional, default is True)
#         threads = True,

#         # proxy URL scheme use use when downloading?
#         # (optional, default is None)
#         proxy = None
#     )
