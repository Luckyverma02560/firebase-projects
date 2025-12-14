'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeroParticles } from '@/components/hero-particles';
import { UpwardNeonParticles } from '@/components/upward-neon-particles';
import { Fingerprint } from 'lucide-react';

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a placeholder. In a real application, you would
    // make an API call to a secure backend to authenticate the user.
    setError('Admin panel is under construction. Login is disabled.');
  };

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
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800/50 border-white/20 focus:ring-purple-500"
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
