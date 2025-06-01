
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const generateMarketData = () => {
  const data = [];
  const now = new Date();
  let basePrice = 125847;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const volatility = (Math.random() - 0.5) * 0.03;
    basePrice *= (1 + volatility);
    
    data.push({
      date: date.toLocaleDateString(),
      value: Math.round(basePrice),
      change: volatility * 100,
      volume: Math.round(Math.random() * 1000000 + 500000)
    });
  }
  
  return data;
};

export const MarketChart = () => {
  const [timeframe, setTimeframe] = useState("1M");
  const [chartData, setChartData] = useState(generateMarketData());
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setChartData(prev => {
          const newData = [...prev];
          const lastValue = newData[newData.length - 1].value;
          const volatility = (Math.random() - 0.5) * 0.01;
          const newValue = Math.round(lastValue * (1 + volatility));
          
          newData.push({
            date: new Date().toLocaleTimeString(),
            value: newValue,
            change: volatility * 100,
            volume: Math.round(Math.random() * 1000000 + 500000)
          });
          
          return newData.slice(-30); // Keep last 30 points
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isLive]);

  const timeframes = ["1D", "1W", "1M", "3M", "1Y"];

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Portfolio Performance</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex rounded-lg bg-slate-700/50 p-1">
              {timeframes.map((tf) => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeframe(tf)}
                  className={`h-8 px-3 text-xs ${
                    timeframe === tf 
                      ? "bg-blue-600 text-white" 
                      : "text-slate-400 hover:text-white hover:bg-slate-600"
                  }`}
                >
                  {tf}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className={`border-slate-600 ${
                isLive 
                  ? "bg-green-600 text-white border-green-600" 
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              {isLive ? "Live" : "Static"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Portfolio Value']}
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#F1F5F9'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-700">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">+8.7%</div>
            <div className="text-xs text-slate-500">30-Day Return</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">12.4%</div>
            <div className="text-xs text-slate-500">Volatility</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">1.24</div>
            <div className="text-xs text-slate-500">Sharpe Ratio</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
