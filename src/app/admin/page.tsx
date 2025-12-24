
'use client';

import { useState, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft, Settings, ShieldCheck, BarChart3 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Dynamically import heavy components
const HeroParticles = dynamic(() => import('@/components/hero-particles').then(m => m.HeroParticles), { ssr: false });
const UpwardNeonParticles = dynamic(() => import('@/components/upward-neon-particles').then(m => m.UpwardNeonParticles), { ssr: false });
const ServicesView = dynamic(() => import('@/components/admin/services-view').then(m => m.ServicesView));
const SecurityView = dynamic(() => import('@/components/admin/security-view').then(m => m.SecurityView));
const AnalyticsView = dynamic(() => import('@/components/admin/analytics-view').then(m => m.AnalyticsView));

type AdminView = 'dashboard' | 'services' | 'security' | 'analytics';

function DashboardCard({ title, description, icon: Icon, onClick }: { title: string; description: string; icon: React.ElementType; onClick: () => void; }) {
    return (
        <Card
            onClick={onClick}
            className="bg-black/30 backdrop-blur-lg border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
        >
            <CardHeader className="flex flex-row items-center gap-4 p-4 md:p-6">
                <div className="bg-gradient-to-br from-purple-600 to-violet-700 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <CardTitle className="text-lg md:text-xl text-white group-hover:text-purple-400 transition-colors">{title}</CardTitle>
                    <CardDescription className="text-sm text-gray-400">{description}</CardDescription>
                </div>
            </CardHeader>
        </Card>
    )
}

export default function AdminPage() {
  const [adminCredentials, setAdminCredentials] = useState({ username: 'lucky', password: 'Lucky02560' });
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === adminCredentials.username && loginPassword === adminCredentials.password) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginUsername('');
    setLoginPassword('');
    setCurrentView('dashboard');
  };

  const handlePasswordChange = (newPassword: string) => {
    setAdminCredentials(prev => ({...prev, password: newPassword}));
  };

  const renderContent = () => {
      switch (currentView) {
        case 'dashboard':
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <DashboardCard title="Manage Services" description="Add, edit, or remove OTT services and their details." icon={Settings} onClick={() => setCurrentView('services')} />
                <DashboardCard title="Security" description="Change admin password and manage access." icon={ShieldCheck} onClick={() => setCurrentView('security')} />
                <DashboardCard title="Site Analytics" description="View visitor traffic and user engagement metrics." icon={BarChart3} onClick={() => setCurrentView('analytics')} />
            </div>
          );
        case 'services':
            return <ServicesView />;
        case 'security':
            return <SecurityView currentPassword={adminCredentials.password} onPasswordChange={handlePasswordChange} />;
        case 'analytics':
            return <AnalyticsView />;
        default: return null;
      }
    }

  if (isLoggedIn) {
    return (
       <div className="relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E10] to-[#1B1C1E] z-0" />
        <div className="absolute inset-0 z-1 pointer-events-none">
            <HeroParticles />
            {!isMobile && <UpwardNeonParticles />}
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-white">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold heading-light-sweep">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="destructive">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>

          {currentView !== 'dashboard' && (
            <Button onClick={() => setCurrentView('dashboard')} variant="outline" className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          )}
          
          {renderContent()}
        </div>
       </div>
    )
  }

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E10] to-[#1B1C1E] z-0" />
      <div className="absolute inset-0 z-1 pointer-events-none">
        <HeroParticles />
        {!isMobile && <UpwardNeonParticles />}
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <Card className="max-w-md mx-auto bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl shadow-purple-500/10">
          <CardHeader>
            <div className="mx-auto bg-gradient-to-r from-purple-500 to-violet-600 p-3 rounded-full mb-4 w-fit">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold heading-light-sweep">
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
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
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
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
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
