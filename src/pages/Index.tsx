
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PortfolioOverview } from "@/components/PortfolioOverview";
import { AIInsights } from "@/components/AIInsights";
import { MarketChart } from "@/components/MarketChart";
import { StockWatchlist } from "@/components/StockWatchlist";
import { RiskAssessment } from "@/components/RiskAssessment";
import { RebalanceRecommendations } from "@/components/RebalanceRecommendations";
import { TrendingUp, TrendingDown, DollarSign, ChartBar } from "lucide-react";

const Index = () => {
  const [totalValue, setTotalValue] = useState(125847.32);
  const [dailyChange, setDailyChange] = useState(2.45);
  const [dailyChangeAmount, setDailyChangeAmount] = useState(3042.18);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const randomChange = (Math.random() - 0.5) * 0.1;
      setDailyChange(prev => Number((prev + randomChange).toFixed(2)));
      setDailyChangeAmount(prev => Number((prev + randomChange * 100).toFixed(2)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ChartBar className="h-8 w-8 text-blue-400" />
                <h1 className="text-2xl font-bold text-white">PortfolioAI</h1>
              </div>
              <Badge variant="outline" className="border-green-500/30 text-green-400">
                Live
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Export Report
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Rebalance Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</div>
              <div className={`flex items-center space-x-1 text-sm ${dailyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {dailyChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{dailyChange >= 0 ? '+' : ''}{dailyChange}% (${dailyChangeAmount >= 0 ? '+' : ''}${dailyChangeAmount})</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">AI Confidence Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">87%</div>
              <Progress value={87} className="mt-2 h-2" />
              <p className="text-xs text-slate-500 mt-1">Strong Buy Signal</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Risk Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">Moderate</div>
              <div className="text-sm text-slate-400">Volatility: 12.4%</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Active Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">23</div>
              <div className="text-sm text-slate-400">Across 8 sectors</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <PortfolioOverview />
            <MarketChart />
            <RebalanceRecommendations />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <AIInsights />
            <StockWatchlist />
            <RiskAssessment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
