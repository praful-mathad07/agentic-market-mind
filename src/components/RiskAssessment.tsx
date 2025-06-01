
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const riskMetrics = [
  { name: "Overall Risk", value: 68, status: "Moderate", color: "text-yellow-400" },
  { name: "Volatility", value: 45, status: "Low", color: "text-green-400" },
  { name: "Concentration Risk", value: 72, status: "High", color: "text-red-400" },
  { name: "Correlation Risk", value: 34, status: "Low", color: "text-green-400" },
];

const sectorRisks = [
  { sector: "Technology", risk: 78, exposure: 35 },
  { sector: "Healthcare", risk: 42, exposure: 20 },
  { sector: "Finance", risk: 65, exposure: 15 },
  { sector: "Energy", risk: 89, exposure: 12 },
];

export const RiskAssessment = () => {
  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Risk Metrics */}
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-3">Risk Metrics</h4>
          <div className="space-y-3">
            {riskMetrics.map((metric) => (
              <div key={metric.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-300">{metric.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-white">{metric.value}%</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${metric.color} border-current`}
                    >
                      {metric.status}
                    </Badge>
                  </div>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Sector Risk Breakdown */}
        <div className="border-t border-slate-700 pt-4">
          <h4 className="text-sm font-medium text-slate-400 mb-3">Sector Risk Analysis</h4>
          <div className="space-y-3">
            {sectorRisks.map((sector) => (
              <div key={sector.sector} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300">{sector.sector}</span>
                    <span className="text-xs text-slate-400">{sector.exposure}% exposure</span>
                  </div>
                  <Progress value={sector.risk} className="h-1.5" />
                </div>
                <div className="ml-3 text-right">
                  <div className={`text-sm font-medium ${
                    sector.risk > 70 ? 'text-red-400' : 
                    sector.risk > 50 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {sector.risk}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Recommendations */}
        <div className="border-t border-slate-700 pt-4">
          <h4 className="text-sm font-medium text-slate-400 mb-3">AI Recommendations</h4>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="text-sm text-yellow-400 font-medium">High Concentration Risk</div>
              <div className="text-xs text-slate-300 mt-1">
                Consider diversifying tech holdings to reduce portfolio volatility.
              </div>
            </div>
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="text-sm text-red-400 font-medium">Energy Sector Volatility</div>
              <div className="text-xs text-slate-300 mt-1">
                Energy exposure showing elevated risk. Consider hedging strategies.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
