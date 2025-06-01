
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const watchlistData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 189.45, change: 2.3, changeAmount: 4.25, volume: "45.2M" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 415.32, change: 5.7, changeAmount: 22.41, volume: "67.8M" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 334.89, change: 1.8, changeAmount: 5.92, volume: "23.1M" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 127.83, change: -0.9, changeAmount: -1.16, volume: "31.5M" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.76, change: 3.2, changeAmount: 7.71, volume: "89.3M" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 142.58, change: -1.2, changeAmount: -1.73, volume: "42.7M" }
];

export const StockWatchlist = () => {
  const [stocks, setStocks] = useState(watchlistData);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(stock => {
        const randomChange = (Math.random() - 0.5) * 0.02;
        const newPrice = Number((stock.price * (1 + randomChange)).toFixed(2));
        const priceChange = newPrice - stock.price;
        const percentChange = Number(((priceChange / stock.price) * 100).toFixed(2));
        
        return {
          ...stock,
          price: newPrice,
          change: percentChange,
          changeAmount: Number(priceChange.toFixed(2))
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Market Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stocks.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-white">{stock.symbol}</span>
                  <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                    {stock.volume}
                  </Badge>
                </div>
                <div className="text-xs text-slate-400">{stock.name}</div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-white">${stock.price}</div>
                <div className={`flex items-center space-x-1 text-xs ${
                  stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stock.change >= 0 ? 
                    <TrendingUp className="h-3 w-3" /> : 
                    <TrendingDown className="h-3 w-3" />
                  }
                  <span>{stock.change >= 0 ? '+' : ''}{stock.change}%</span>
                  <span>({stock.changeAmount >= 0 ? '+' : ''}${stock.changeAmount})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
