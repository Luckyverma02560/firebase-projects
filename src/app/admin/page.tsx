
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeroParticles } from '@/components/hero-particles';
import { UpwardNeonParticles } from '@/components/upward-neon-particles';
import { Fingerprint, LogOut, ShieldCheck, BarChart3, LineChart, PieChartIcon } from 'lucide-react';
import { ResponsiveContainer, BarChart as RechartsBarChart, LineChart as RechartsLineChart, PieChart as RechartsPieChart, XAxis, YAxis, Tooltip, Legend, Bar, Line, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


// Mock data for charts
const monthlyData = [
  { name: 'Jan', visitors: 4000, active: 2400 },
  { name: 'Feb', visitors: 3000, active: 1398 },
  { name: 'Mar', visitors: 2000, active: 9800 },
  { name: 'Apr', visitors: 2780, active: 3908 },
  { name: 'May', visitors: 1890, active: 4800 },
  { name: 'Jun', visitors: 2390, active: 3800 },
];

const yearlyData = [
  { name: '2022', visitors: 400, active: 240 },
  { name: '2023', visitors: 300, active: 139 },
  { name: '2024', visitors: 500, active: 480 },
];

const sourceData = [
  { name: 'Direct', value: 400 },
  { name: 'Referral', value: 300 },
  { name: 'Social', value: 300 },
  { name: 'Organic', value: 200 },
];
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const mockServices = [
    { id: 1, name: 'Netflix', icon: '/netflix-logo.png', description: 'Watch movies and TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.' },
    { id: 2, name: 'Prime Video', icon: '/prime-video-logo.png', description: 'Enjoy exclusive Amazon Originals as well as popular movies and TV shows.' },
];

const mockPricing = [
    { service: 'Netflix', plan: 'Basic', price: 100 },
    { service: 'Netflix', plan: 'Standard', price: 130 },
    { service: 'Prime Video', plan: 'Monthly', price: 100 },
];


export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'lucky' && password === 'Lucky02560') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };
  
  if (isLoggedIn) {
    return (
       <div className="relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E10] to-[#1B1C1E] z-0" />
        <div className="absolute inset-0 z-1 pointer-events-none">
            <HeroParticles />
            <UpwardNeonParticles />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-white">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold heading-light-sweep">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="destructive">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 md:col-span-2">
              <CardHeader>
                <CardTitle>Manage Services</CardTitle>
                <CardDescription>Edit OTT names, icons, and descriptions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ottName">OTT Name</Label>
                      <Input id="ottName" placeholder="e.g., Netflix" className="bg-gray-800/50 border-white/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iconUrl">Icon URL</Label>
                      <Input id="iconUrl" placeholder="e.g., /netflix-logo.png" className="bg-gray-800/50 border-white/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Service description" className="bg-gray-800/50 border-white/20" />
                    </div>
                    <Button className="bg-gradient-to-r from-purple-500 to-violet-600">Save Changes</Button>
                 </form>
                 <div className="mt-6">
                    <h4 className="font-bold mb-2">Current Services</h4>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockServices.map(service => (
                                <TableRow key={service.id}>
                                    <TableCell className="font-medium">{service.name}</TableCell>
                                    <TableCell>{service.description.substring(0,50)}...</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                 </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle>Update Pricing</CardTitle>
                <CardDescription>Change subscription plan prices.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label>Service</Label>
                        <Select>
                            <SelectTrigger className="bg-gray-800/50 border-white/20">
                                <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="netflix">Netflix</SelectItem>
                                <SelectItem value="prime">Prime Video</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Plan</Label>
                        <Select>
                            <SelectTrigger className="bg-gray-800/50 border-white/20">
                                <SelectValue placeholder="Select a plan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="basic">Basic</SelectItem>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPrice">New Price (INR)</Label>
                        <Input id="newPrice" type="number" placeholder="e.g., 150" className="bg-gray-800/50 border-white/20"/>
                    </div>
                    <Button className="bg-gradient-to-r from-green-500 to-teal-600 w-full">Update Price</Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Change admin password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" className="bg-gray-800/50 border-white/20"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" className="bg-gray-800/50 border-white/20"/>
                </div>
                 <Button className="bg-gradient-to-r from-red-500 to-orange-600 w-full">Change Password</Button>
              </CardContent>
            </Card>

             <Card className="md:col-span-2 lg:col-span-3 bg-black/30 backdrop-blur-lg border border-white/10">
                <CardHeader>
                    <CardTitle>Site Analytics</CardTitle>
                    <CardDescription>Visitor and activity metrics.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm text-gray-300">
                    <div className="lg:col-span-2 h-64">
                       <h3 className="font-bold mb-2 flex items-center"><LineChart className="mr-2 h-5 w-5 text-purple-400"/>Monthly Visitors</h3>
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={monthlyData}>
                           <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                           <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                           <Tooltip contentStyle={{ backgroundColor: '#1B1C1E', border: '1px solid #333' }} />
                           <Legend />
                           <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
                           <Line type="monotone" dataKey="active" stroke="#82ca9d" />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-64">
                       <h3 className="font-bold mb-2 flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-green-400"/>Yearly Overview</h3>
                      <ResponsiveContainer width="100%" height="100%">
                         <RechartsBarChart data={yearlyData}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                            <Tooltip contentStyle={{ backgroundColor: '#1B1C1E', border: '1px solid #333' }} />
                            <Legend />
                            <Bar dataKey="visitors" fill="#8884d8" />
                         </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                     <div className="h-64 lg:col-span-3">
                       <h3 className="font-bold mb-2 flex items-center"><PieChartIcon className="mr-2 h-5 w-5 text-yellow-400"/>Traffic Sources</h3>
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                             <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
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
          </div>
        </div>
       </div>
    )
  }

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E10] to-[#1B1C1E] z-0" />
      <div className="absolute inset-0 z-1 pointer-events-none">
        <HeroParticles />
        <UpwardNeonParticles />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <Card className="max-w-md mx-auto bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl shadow-purple-500/10">
          <CardHeader>
            <div className="mx-auto bg-gradient-to-r from-purple-500 to-violet-600 p-3 rounded-full mb-4 w-fit">
              <Fingerprint className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold heading-light-sweep">
              Admin Control Panel
            </CardTitle>
            <CardDescription className="text-gray-400">
              Please log in to manage your services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6 text-left">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="lucky"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800/50 border-white/20 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800/50 border-white/20 focus:ring-purple-500"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" size="lg" className="w-full font-bold bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:scale-105 transition-transform">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    