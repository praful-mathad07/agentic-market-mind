
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

const rebalanceRecommendations = [
  {
    action: "Reduce",
    asset: "Technology Sector",
    current: 35,
    target: 30,
    amount: "$6,292",
    reason: "Overweight due to recent performance",
    urgency: "Medium",
    impact: 5.2
  },
  {
    action: "Increase",
    asset: "Healthcare Sector", 
    current: 20,
    target: 23,
    amount: "$3,775",
    reason: "Defensive positioning for market uncertainty",
    urgency: "Low",
    impact: 2.1
  },
  {
    action: "Reduce",
    asset: "Energy Sector",
    current: 12,
    target: 8,
    amount: "$5,034",
    reason: "High volatility and regulatory risks",
    urgency: "High",
    impact: 7.8
  },
  {
    action: "Increase",
    asset: "Finance Sector",
    current: 15,
    target: 18,
    amount: "$3,775",
    reason: "Rising interest rate environment",
    urgency: "Medium",
    impact: 4.3
  }
];

export const RebalanceRecommendations = () => {
  const getActionColor = (action: string) => {
    return action === "Increase" ? "text-green-400" : "text-red-400";
  };

  const getActionIcon = (action: string) => {
    return action === "Increase" ? 
      <TrendingUp className="h-4 w-4" /> : 
      <TrendingDown className="h-4 w-4" />;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High": return "border-red-500/30 text-red-400";
      case "Medium": return "border-yellow-500/30 text-yellow-400";
      default: return "border-green-500/30 text-green-400";
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">AI Rebalancing Recommendations</CardTitle>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Execute All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rebalanceRecommendations.map((rec, index) => (
            <div key={index} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 ${getActionColor(rec.action)}`}>
                    {getActionIcon(rec.action)}
                    <span className="font-semibold">{rec.action}</span>
                  </div>
                  <span className="text-white font-medium">{rec.asset}</span>
                </div>
                <Badge variant="outline" className={`text-xs ${getUrgencyColor(rec.urgency)}`}>
                  {rec.urgency}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Current Allocation</div>
                  <div className="text-sm text-white font-medium">{rec.current}%</div>
                  <Progress value={rec.current} className="h-1.5 mt-1" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Target Allocation</div>
                  <div className="text-sm text-white font-medium">{rec.target}%</div>
                  <Progress value={rec.target} className="h-1.5 mt-1" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400">
                    Amount: <span className="text-white font-medium">{rec.amount}</span>
                  </span>
                  <span className="text-slate-400">
                    Impact: <span className="text-white font-medium">{rec.impact}%</span>
                  </span>
                </div>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Preview
                </Button>
              </div>

              <div className="mt-2 text-xs text-slate-400">
                {rec.reason}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-blue-400">Rebalancing Impact</h4>
            <Badge variant="outline" className="border-blue-500/30 text-blue-400">
              Recommended
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-white">+2.3%</div>
              <div className="text-xs text-slate-400">Expected Return</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">-1.7%</div>
              <div className="text-xs text-slate-400">Risk Reduction</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">0.89</div>
              <div className="text-xs text-slate-400">New Sharpe Ratio</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
