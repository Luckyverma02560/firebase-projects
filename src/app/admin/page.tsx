
'use client';

import { useState, useMemo, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeroParticles } from '@/components/hero-particles';
import { UpwardNeonParticles } from '@/components/upward-neon-particles';
import { Fingerprint, LogOut, ShieldCheck, BarChart3, LineChart, PieChartIcon, ArrowLeft, Settings, DollarSign, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { ResponsiveContainer, BarChart as RechartsBarChart, LineChart as RechartsLineChart, PieChart as RechartsPieChart, XAxis, YAxis, Tooltip, Legend, Bar, Line, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogTrigger, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from '@/hooks/use-mobile';
import { Switch } from '@/components/ui/switch';


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

const serviceLogoIds = [
    'netflix-logo',
    'prime-video-logo',
    'hotstar-logo',
    'zee5-logo',
    'youtube-premium-logo',
    'sony-logo',
    'aha-logo',
    'canva-logo'
];

type PlanName = 'Basic' | 'Standard' | 'Premium' | 'Super Premium';
type BillingCycle = 'monthly' | 'half-yearly' | 'yearly';

interface PlanDetails {
    price: string;
    features: string[];
    isAvailable: boolean;
}

type ServicePlans = Record<BillingCycle, Record<PlanName, PlanDetails>>;

interface Service {
    id: number;
    name: string;
    icon: string;
    plans: ServicePlans;
}

const generateDefaultPlans = (): ServicePlans => ({
    monthly: {
        'Basic': { price: '100', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Standard': { price: '130', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Premium': { price: '150', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Super Premium': { price: '170', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true }
    },
    'half-yearly': {
        'Basic': { price: '550', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Standard': { price: '700', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Premium': { price: '850', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Super Premium': { price: '1000', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true }
    },
    yearly: {
        'Basic': { price: '1000', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Standard': { price: '1300', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Premium': { price: '1500', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true },
        'Super Premium': { price: '1800', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], isAvailable: true }
    }
});


const initialServices: Service[] = PlaceHolderImages.filter(p => serviceLogoIds.includes(p.id)).map((p, index) => {
    const service: Service = {
        id: index + 1,
        name: p.description,
        icon: p.imageUrl,
        plans: generateDefaultPlans(),
    };

    if (p.description === 'Prime Video') {
        service.plans.monthly['Basic'].price = '90';
        service.plans.monthly['Standard'].price = '120';
        service.plans.monthly['Premium'].price = '150';
        service.plans.monthly['Super Premium'].price = '170';
    }

    if (p.description === 'Netflix') {
        service.plans['half-yearly']['Basic'].isAvailable = false;
        service.plans['half-yearly']['Standard'].isAvailable = false;
        service.plans['half-yearly']['Super Premium'].isAvailable = false;

        service.plans['yearly']['Basic'].isAvailable = false;
        service.plans['yearly']['Standard'].isAvailable = false;
        service.plans['yearly']['Super Premium'].isAvailable = false;
    }

    return service;
});

type AdminView = 'dashboard' | 'services' | 'security' | 'analytics';

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const isMobile = useIsMobile();

  const [analyticsTimespan, setAnalyticsTimespan] = useState<'daily' | 'monthly' | 'yearly'>('monthly');

  const [services, setServices] = useState<Service[]>(initialServices);
  
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
      name: '',
      icon: '',
      plans: generateDefaultPlans(),
  });

  const [editingService, setEditingService] = useState<Service | null>(null);

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
    setCurrentView('dashboard');
  };
    
  const handlePlanChange = (billing: BillingCycle, plan: PlanName, field: 'price' | `feature${number}` | 'isAvailable', value: string | boolean, isEditing: boolean) => {
    const target = isEditing ? editingService : newService;
    const setter = isEditing ? setEditingService : setNewService;
    if (!target) return;

    const updatedPlans = JSON.parse(JSON.stringify(target.plans)); // Deep copy

    if (field === 'price') {
        updatedPlans[billing][plan].price = value as string;
    } else if (field === 'isAvailable') {
        updatedPlans[billing][plan].isAvailable = value as boolean;
    } else {
        const featureIndex = parseInt(field.replace('feature', '')) - 1;
        updatedPlans[billing][plan].features[featureIndex] = value as string;
    }
    
    setter({ ...target, plans: updatedPlans } as Service | Omit<Service, 'id'>);
  };


  const handleAddService = (e: FormEvent<HTMLFormEvent>) => {
    e.preventDefault();
    if (!newService.name || !newService.icon) {
        alert('Please fill out the service name and icon URL.');
        return;
    }
    const serviceToAdd: Service = {
        id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
        ...newService
    };
    setServices(prev => [...prev, serviceToAdd]);
    // Reset form
    setNewService({ name: '', icon: '', plans: generateDefaultPlans() });
  };

  const handleUpdateService = (e: FormEvent<HTMLFormEvent>) => {
    e.preventDefault();
    if (!editingService) return;

    setServices(services.map(s => s.id === editingService.id ? editingService : s));
    setEditingService(null);
  };
  
    const handleRemoveService = (id: number) => {
        setServices(services.filter(s => s.id !== id));
    };

  const analyticsData = useMemo(() => {
    switch(analyticsTimespan) {
        case 'daily': return dailyData;
        case 'monthly': return monthlyData;
        case 'yearly': return yearlyData;
    }
  }, [analyticsTimespan]);

  const planNames: PlanName[] = ['Basic', 'Standard', 'Premium', 'Super Premium'];
  
  if (isLoggedIn) {
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
            const renderPlanForm = (serviceData: Omit<Service, 'id'> | Service, isEditing: boolean) => (
                <Tabs defaultValue="monthly" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="half-yearly">Half Yearly</TabsTrigger>
                        <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                    {(['monthly', 'half-yearly', 'yearly'] as BillingCycle[]).map(billing => (
                        <TabsContent key={billing} value={billing} className="space-y-4">
                            {planNames.map(plan => {
                                const plansForService = (serviceData.name === 'Netflix' || serviceData.name === 'Prime Video') ? planNames : planNames.slice(0, 3);
                                if (!plansForService.includes(plan)) return null;

                                return (
                                    <div key={plan} className="p-3 border border-white/20 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-md md:text-lg font-bold text-purple-400">{plan} Plan</h4>
                                            <div className="flex items-center space-x-2">
                                                <Label htmlFor={`${billing}-${plan}-available`}>Plan Available</Label>
                                                <Switch 
                                                    id={`${billing}-${plan}-available`} 
                                                    checked={serviceData.plans[billing][plan].isAvailable}
                                                    onCheckedChange={(checked) => handlePlanChange(billing, plan, 'isAvailable', checked, isEditing)}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2 md:col-span-1">
                                                <Label htmlFor={`${billing}-${plan}-price`}>Price (INR)</Label>
                                                <Input 
                                                    id={`${billing}-${plan}-price`} 
                                                    value={serviceData.plans[billing][plan].price} 
                                                    onChange={(e) => handlePlanChange(billing, plan, 'price', e.target.value, isEditing)}
                                                    className="bg-gray-800/50 border-white/20"
                                                />
                                            </div>
                                            <div className="space-y-3 md:col-span-2">
                                                {serviceData.plans[billing][plan].features.map((feature, index) => (
                                                    <div key={index} className="space-y-1.5">
                                                        <Label htmlFor={`${billing}-${plan}-feature${index+1}`}>Feature {index + 1}</Label>
                                                        <Input 
                                                            id={`${billing}-${plan}-feature${index+1}`} 
                                                            value={feature}
                                                            onChange={(e) => handlePlanChange(billing, plan, `feature${index+1}` as any, e.target.value, isEditing)}
                                                            className="bg-gray-800/50 border-white/20"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </TabsContent>
                    ))}
                </Tabs>
            );

            return (
                <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl"><Settings /> Manage Services</CardTitle>
                        <CardDescription>Add a new service or edit existing ones, including their detailed plans.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div>
                            <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 text-purple-400"><PlusCircle /> Add New Service</h3>
                            <form onSubmit={handleAddService} className="space-y-4 p-4 border border-white/10 rounded-lg">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="ottName">OTT Name</Label>
                                        <Input id="ottName" placeholder="e.g., Netflix" className="bg-gray-800/50 border-white/20" value={newService.name} onChange={(e) => setNewService(s => ({...s, name: e.target.value}))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="iconUrl">Icon Image URL</Label>
                                        <Input id="iconUrl" placeholder="https://path/to/icon.png" className="bg-gray-800/50 border-white/20" value={newService.icon} onChange={(e) => setNewService(s => ({...s, icon: e.target.value}))} />
                                    </div>
                                </div>
                                {renderPlanForm(newService, false)}
                                <Button type="submit" className="bg-gradient-to-r from-purple-500 to-violet-600">Add Service</Button>
                            </form>
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold mb-4 text-purple-400">Current Services</h3>
                            <div className="border border-white/10 rounded-lg overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Icon</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Sample Price (Monthly Basic)</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {services.map(service => (
                                            <TableRow key={service.id}>
                                                <TableCell><img src={service.icon} alt={service.name} className="w-8 h-8 object-contain" /></TableCell>
                                                <TableCell className="font-medium">{service.name}</TableCell>
                                                <TableCell>INR {service.plans.monthly.Basic.price}</TableCell>
                                                <TableCell className="text-right flex justify-end gap-1 md:gap-2">
                                                    <Dialog onOpenChange={(open) => !open && setEditingService(null)}>
                                                        <DialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" onClick={() => setEditingService(JSON.parse(JSON.stringify(service)))}>
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        {editingService?.id === service.id && (
                                                            <DialogContent className="bg-gray-900 border-purple-500 text-white max-w-4xl h-[90vh] flex flex-col">
                                                                <DialogHeader>
                                                                    <DialogTitle>Edit {editingService.name}</DialogTitle>
                                                                </DialogHeader>
                                                                <form onSubmit={handleUpdateService} className="space-y-4 overflow-y-auto flex-grow pr-2 sm:pr-6">
                                                                    <div className="grid md:grid-cols-2 gap-4">
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="editOttName">OTT Name</Label>
                                                                            <Input id="editOttName" value={editingService.name} onChange={(e) => setEditingService({...editingService, name: e.target.value})} className="bg-gray-800/50 border-white/20"/>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="editIconUrl">Icon Image URL</Label>
                                                                            <Input id="editIconUrl" value={editingService.icon} onChange={(e) => setEditingService({...editingService, icon: e.target.value})} className="bg-gray-800/50 border-white/20"/>
                                                                        </div>
                                                                    </div>
                                                                    {renderPlanForm(editingService, true)}
                                                                    <DialogFooter className="sticky bottom-0 bg-gray-900 py-4">
                                                                        <DialogClose asChild>
                                                                            <Button type="submit" className="bg-gradient-to-r from-green-500 to-teal-600">Save Changes</Button>
                                                                        </DialogClose>
                                                                    </DialogFooter>
                                                                </form>
                                                            </DialogContent>
                                                        )}
                                                    </Dialog>
                                                     <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                          <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-500/10">
                                                            <Trash2 className="h-4 w-4" />
                                                          </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className="bg-gray-900 border-red-500 text-white">
                                                          <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                              This action cannot be undone. This will permanently delete the
                                                              <span className="font-bold"> {service.name} </span>
                                                              service.
                                                            </AlertDialogDescription>
                                                          </AlertDialogHeader>
                                                          <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                              className="bg-red-600 hover:bg-red-700"
                                                              onClick={() => handleRemoveService(service.id)}
                                                            >
                                                              Delete
                                                            </AlertDialogAction>
                                                          </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                      </AlertDialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            );
        case 'security':
            return (
                <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl"><ShieldCheck /> Security</CardTitle>
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
            );
        case 'analytics':
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
        default: return null;
      }
    }

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
              <Fingerprint className="h-8 w-8 text-white" />
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

    
