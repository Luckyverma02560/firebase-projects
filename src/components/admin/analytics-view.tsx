
'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, LineChart, PieChartIcon } from 'lucide-react';

const RechartsLineChart = dynamic(() => import('recharts').then(m => m.LineChart), { ssr: false });
const RechartsPieChart = dynamic(() => import('recharts').then(m => m.PieChart), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(m => m.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(m => m.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(m => m.Legend), { ssr: false });
const Line = dynamic(() => import('recharts').then(m => m.Line), { ssr: false });
const Pie = dynamic(() => import('recharts').then(m => m.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then(m => m.Cell), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer), { ssr: false });

// Mock data
const dailyData = Array.from({ length: 7 }, (_, i) => ({ name: `Day ${i+1}`, visitors: Math.floor(Math.random() * 500) + 100 }));
const monthlyData = [
  { name: 'Jan', visitors: 4000, active: 2400 },
  { name: 'Feb', visitors: 3000, active: 1398 },
  { name: 'Mar', visitors: 2000, active: 9800 },
  { name: 'Apr', visitors: 2780, active: 3908 },
  { name: 'May', visitors: 1890, active: 4800 },
  { name: 'Jun', visitors: 2390, active: 3800 },
];
const yearlyData = [
  { name: '2022', visitors: 40000, active: 24000 },
  { name: '2023', visitors: 30000, active: 13980 },
  { name: '2024', visitors: 50000, active: 48000 },
];
const sourceData = [
  { name: 'Direct', value: 400 }, { name: 'Referral', value: 300 },
  { name: 'Social', value: 300 }, { name: 'Organic', value: 200 },
];
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

export default function AnalyticsView() {
    const [analyticsTimespan, setAnalyticsTimespan] = useState<'daily' | 'monthly' | 'yearly'>('monthly');

    const analyticsData = useMemo(() => {
        switch(analyticsTimespan) {
            case 'daily': return dailyData;
            case 'monthly': return monthlyData;
            case 'yearly': return yearlyData;
        }
    }, [analyticsTimespan]);

    return (
        <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
           <CardHeader>
               <CardTitle className="flex items-center gap-2 text-2xl"><BarChart3 /> Site Analytics</CardTitle>
               <CardDescription>Visitor and activity metrics.</CardDescription>
           </CardHeader>
           <CardContent>
               <div className="flex justify-center gap-2 mb-6">
                   <Button variant={analyticsTimespan === 'daily' ? 'default' : 'outline'} onClick={() => setAnalyticsTimespan('daily')}>Daily</Button>
                   <Button variant={analyticsTimespan === 'monthly' ? 'default' : 'outline'} onClick={() => setAnalyticsTimespan('monthly')}>Monthly</Button>
                   <Button variant={analyticsTimespan === 'yearly' ? 'default' : 'outline'} onClick={() => setAnalyticsTimespan('yearly')}>Yearly</Button>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm text-gray-300">
                   <div className="lg:col-span-2 h-64">
                       <h3 className="font-bold mb-2 flex items-center capitalize text-base"><LineChart className="mr-2 h-5 w-5 text-purple-400"/>{analyticsTimespan} Visitors</h3>
                       <ResponsiveContainer width="100%" height="100%">
                           <RechartsLineChart data={analyticsData}>
                              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                              <Tooltip contentStyle={{ backgroundColor: '#1B1C1E', border: '1px solid #333' }} />
                              <Legend />
                              <Line type="monotone" dataKey="visitors" stroke="#8884d8" name="Visitors" />
                              {analyticsData[0]?.active && <Line type="monotone" dataKey="active" stroke="#82ca9d" name="Active Users" />}
                           </RechartsLineChart>
                       </ResponsiveContainer>
                   </div>
                   <div className="h-64">
                       <h3 className="font-bold mb-2 flex items-center text-base"><PieChartIcon className="mr-2 h-5 w-5 text-yellow-400"/>Traffic Sources</h3>
                       <ResponsiveContainer width="100%" height="100%">
                           <RechartsPieChart>
                               <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
                                   {sourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                               </Pie>
                               <Tooltip contentStyle={{ backgroundColor: '#1B1C1E', border: '1px solid #333' }} />
                               <Legend />
                           </RechartsPieChart>
                       </ResponsiveContainer>
                   </div>
               </div>
           </CardContent>
       </Card>
   );
}
