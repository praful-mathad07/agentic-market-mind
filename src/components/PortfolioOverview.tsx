
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const portfolioData = [
  { name: "Technology", value: 35, amount: 44046, color: "#3B82F6" },
  { name: "Healthcare", value: 20, amount: 25169, color: "#10B981" },
  { name: "Finance", value: 15, amount: 18877, color: "#F59E0B" },
  { name: "Energy", value: 12, amount: 15102, color: "#EF4444" },
  { name: "Consumer", value: 10, amount: 12585, color: "#8B5CF6" },
  { name: "Real Estate", value: 8, amount: 10068, color: "#06B6D4" },
];

const performanceData = [
  { name: "Jan", value: 98500 },
  { name: "Feb", value: 102300 },
  { name: "Mar", value: 108900 },
  { name: "Apr", value: 105200 },
  { name: "May", value: 115600 },
  { name: "Jun", value: 125847 },
];

export const PortfolioOverview = () => {
  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Portfolio Allocation & Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Portfolio Allocation Pie Chart */}
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-4">Sector Allocation</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, `${name}`]}
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#F1F5F9'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {portfolioData.map((entry) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-xs text-slate-400">{entry.name}</span>
                  <span className="text-xs text-white ml-auto">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-4">6-Month Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#F1F5F9'
                  }}
                />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
