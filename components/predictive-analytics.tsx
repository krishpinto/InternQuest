'use client';

import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ChevronLeft, TrendingUp } from 'lucide-react';

const data = [
  { month: 'Month 1', statusQuo: 100, withMisrut: 105 },
  { month: 'Month 2', statusQuo: 102, withMisrut: 115 },
  { month: 'Month 3', statusQuo: 104, withMisrut: 128 },
  { month: 'Month 4', statusQuo: 105, withMisrut: 145 },
  { month: 'Month 5', statusQuo: 107, withMisrut: 162 },
  { month: 'Month 6', statusQuo: 108, withMisrut: 180 },
];

export function PredictiveAnalytics() {
  const { setCurrentView, businessData } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('dashboard')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Growth Forecast</h1>
            <p className="text-muted-foreground">
              Your 6-month revenue projection based on Misrut AI strategies
            </p>
          </div>

          {/* Chart Card */}
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Projected Revenue Growth</h2>
              <p className="text-muted-foreground">
                Next 6 months: Status Quo vs. Following Misrut AI Leads
              </p>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorQuo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-muted)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-muted)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMisrut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'Revenue Index', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                  }}
                  labelStyle={{ color: 'var(--color-foreground)' }}
                  formatter={(value) => [`${value}%`, '']}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value) => {
                    if (value === 'statusQuo') return 'Status Quo (Doing Nothing)';
                    if (value === 'withMisrut') return 'Following Misrut AI Leads';
                    return value;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="statusQuo"
                  stroke="var(--color-muted-foreground)"
                  fillOpacity={1}
                  fill="url(#colorQuo)"
                  name="statusQuo"
                />
                <Area
                  type="monotone"
                  dataKey="withMisrut"
                  stroke="var(--color-primary)"
                  fillOpacity={1}
                  fill="url(#colorMisrut)"
                  name="withMisrut"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Growth Projection</p>
                  <p className="text-3xl font-bold text-primary mt-2">32%</p>
                  <p className="text-sm text-muted-foreground mt-2">Inbound leads growth</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary/50" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Strategy Focus</p>
                  <p className="text-3xl font-bold text-primary mt-2">2</p>
                  <p className="text-sm text-muted-foreground mt-2">Primary strategies</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Implementation</p>
                  <p className="text-3xl font-bold text-primary mt-2">6M</p>
                  <p className="text-sm text-muted-foreground mt-2">Timeline</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">Key Insights</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Whitespace Strategy</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Implementing whitespace mapping strategies could capture an additional 15-20% of market share in your locality.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Cross-sell Opportunities</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Strategic cross-sell partnerships could increase revenue by 12% through complementary services.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Competitive Mitigation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Addressing competitive threats early can prevent 5-8% revenue loss in the next quarter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Market Timing</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Q2 shows the highest growth potential - prioritize strategy execution during this window.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 text-center space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Ready to execute your growth plan?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Return to the dashboard to view detailed action steps and start implementing your personalized growth strategy.
            </p>
            <Button
              onClick={() => setCurrentView('dashboard')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
