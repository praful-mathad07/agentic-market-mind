
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const insights = [
  {
    id: 1,
    type: "opportunity",
    title: "Tech Sector Momentum",
    description: "AI models detect strong momentum in semiconductor stocks. Consider increasing allocation to NVDA and AMD.",
    confidence: 89,
    impact: "High",
    action: "Buy",
    timeframe: "Next 7 days"
  },
  {
    id: 2,
    type: "warning",
    title: "Energy Sector Risk",
    description: "Elevated volatility detected in energy sector. Recommend reducing exposure by 3-5%.",
    confidence: 76,
    impact: "Medium",
    action: "Reduce",
    timeframe: "This week"
  },
  {
    id: 3,
    type: "rebalance",
    title: "Portfolio Drift",
    description: "Tech allocation has grown to 35%. Consider rebalancing to maintain target 30% allocation.",
    confidence: 92,
    impact: "Low",
    action: "Rebalance",
    timeframe: "End of month"
  }
];

export const AIInsights = () => {
  const [currentInsight, setCurrentInsight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const insight = insights[currentInsight];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <TrendingUp className="h-5 w-5 text-green-400" />;
      case "warning":
        return <TrendingDown className="h-5 w-5 text-red-400" />;
      default:
        return <DollarSign className="h-5 w-5 text-blue-400" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "border-green-500/30 bg-green-500/10";
      case "warning":
        return "border-red-500/30 bg-red-500/10";
      default:
        return "border-blue-500/30 bg-blue-500/10";
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">AI Market Intelligence</CardTitle>
          <Badge variant="outline" className="border-blue-500/30 text-blue-400">
            Live Analysis
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Featured Insight */}
        <div className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
          <div className="flex items-start space-x-3">
            {getInsightIcon(insight.type)}
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">{insight.title}</h3>
              <p className="text-sm text-slate-300 mb-3">{insight.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400">
                    Confidence: <span className="text-white font-medium">{insight.confidence}%</span>
                  </span>
                  <span className="text-slate-400">
                    Impact: <span className="text-white font-medium">{insight.impact}</span>
                  </span>
                </div>
                <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                  {insight.timeframe}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-3">Recommended Actions</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
              Execute {insight.action} Recommendation
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
              View Detailed Analysis
            </Button>
          </div>
        </div>

        {/* AI Confidence Metrics */}
        <div className="border-t border-slate-700 pt-4">
          <h4 className="text-sm font-medium text-slate-400 mb-3">AI Performance Today</h4>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-400">94%</div>
              <div className="text-xs text-slate-500">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">12</div>
              <div className="text-xs text-slate-500">Signals Generated</div>
            </div>
          </div>
        </div>

        {/* Insight Navigation */}
        <div className="flex justify-center space-x-2">
          {insights.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentInsight(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentInsight ? 'bg-blue-400' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
