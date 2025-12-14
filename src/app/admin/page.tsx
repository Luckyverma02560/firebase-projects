
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeroParticles } from '@/components/hero-particles';
import { UpwardNeonParticles } from '@/components/upward-neon-particles';
import { Fingerprint, LogOut, ShieldCheck } from 'lucide-react';
import { BarChart, LineChart, PieChart } from 'recharts';

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
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle>Manage Services</CardTitle>
                <CardDescription>Edit OTT names, icons, and descriptions.</CardDescription>
              </CardHeader>
              <CardContent>
                 <p className="text-gray-400 text-sm">This section is under construction.</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle>Update Pricing</CardTitle>
                <CardDescription>Change subscription plan prices.</CardDescription>
              </CardHeader>
              <CardContent>
                 <p className="text-gray-400 text-sm">This section is under construction.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Change admin password.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">This section is under construction.</p>
              </CardContent>
            </Card>

             <Card className="md:col-span-2 lg:col-span-3 bg-black/30 backdrop-blur-lg border border-white/10">
                <CardHeader>
                    <CardTitle>Site Analytics</CardTitle>
                    <CardDescription>Visitor and activity metrics.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-400 text-sm">This section is under construction. Graphs and data will be displayed here.</p>
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
