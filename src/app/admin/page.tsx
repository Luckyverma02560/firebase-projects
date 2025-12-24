
'use client';

import { useState, useMemo, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Fingerprint, LogOut, ShieldCheck, BarChart3, LineChart, PieChartIcon, ArrowLeft, Settings, DollarSign, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogTrigger, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from '@/hooks/use-mobile';
import { Switch } from '@/components/ui/switch';
import { generateDefaultPlans, planNames, billingCycles, type Service, type PlanName, type BillingCycle } from '@/lib/services';
import { useToast } from '@/hooks/use-toast';
import { useServices } from '@/context/service-context';

const HeroParticles = dynamic(() => import('@/components/hero-particles').then(m => m.HeroParticles), { ssr: false });
const UpwardNeonParticles = dynamic(() => import('@/components/upward-neon-particles').then(m => m.UpwardNeonParticles), { ssr: false });

const RechartsBarChart = dynamic(() => import('recharts').then(m => m.BarChart), { ssr: false });
const RechartsLineChart = dynamic(() => import('recharts').then(m => m.LineChart), { ssr: false });
const RechartsPieChart = dynamic(() => import('recharts').then(m => m.PieChart), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(m => m.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(m => m.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(m => m.Legend), { ssr: false });
const Bar = dynamic(() => import('recharts').then(m => m.Bar), { ssr: false });
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

type AdminView = 'dashboard' | 'services' | 'security' | 'analytics';

export default function AdminPage() {
  const [adminCredentials, setAdminCredentials] = useState({ username: 'lucky', password: 'Lucky02560' });
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { services, setServices } = useServices();

  const [analyticsTimespan, setAnalyticsTimespan] = useState<'daily' | 'monthly' | 'yearly'>('monthly');

  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
      name: '',
      icon: '',
      plans: generateDefaultPlans(),
  });

  const [editingService, setEditingService] = useState<Service | null>(null);

  const [passwordChange, setPasswordChange] = useState({ current: '', new: '' });

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

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordChange.current !== adminCredentials.password) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Current password is not correct.",
        });
        return;
    }
    if (passwordChange.new.length < 6) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "New password must be at least 6 characters long.",
        });
        return;
    }
    setAdminCredentials(prev => ({...prev, password: passwordChange.new}));
    setPasswordChange({current: '', new: ''});
    toast({
        title: "Success",
        description: "Your password has been changed successfully.",
    });
  };
    
  const handlePlanChange = (billing: BillingCycle | '3-months' | '6-months', plan: PlanName, field: string, value: string | boolean, isEditing: boolean) => {
      const target = isEditing ? editingService : newService;
      const setter = isEditing ? setEditingService : setNewService;
      if (!target) return;
  
      const updatedPlans = JSON.parse(JSON.stringify(target.plans)); // Deep copy
  
      if (!updatedPlans[billing]) {
        updatedPlans[billing] = {};
      }
      if (!updatedPlans[billing][plan]) {
        updatedPlans[billing][plan] = { price: '', features: [], isAvailable: false };
      }

      if (field === 'price') {
          updatedPlans[billing][plan].price = value as string;
      } else if (field === 'isAvailable') {
          updatedPlans[billing][plan].isAvailable = value as boolean;
      } else if (field.startsWith('feature')) {
          const featureIndex = parseInt(field.replace('feature', '')) - 1;
          if (featureIndex >= 0 && featureIndex < updatedPlans[billing][plan].features.length) {
              updatedPlans[billing][plan].features[featureIndex] = value as string;
          }
      }
      
      setter({ ...target, plans: updatedPlans } as Service | Omit<Service, 'id'>);
  };


  const handleAddService = (e: FormEvent<HTMLFormEvent>) => {
    e.preventDefault();
    if (!newService.name || !newService.icon) {
        toast({ variant: 'destructive', title: 'Please fill out the service name and icon URL.'});
        return;
    }
    const serviceToAdd: Service = {
        id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
        ...newService
    };
    setServices(prev => [...prev, serviceToAdd]);
    setNewService({ name: '', icon: '', plans: generateDefaultPlans() });
    toast({ title: 'Service Added', description: `${serviceToAdd.name} has been successfully added.`});
  };

  const handleUpdateService = (e: FormEvent<HTMLFormEvent>) => {
    e.preventDefault();
    if (!editingService) return;

    setServices(services.map(s => s.id === editingService.id ? editingService : s));
    setEditingService(null);
    toast({ title: 'Service Updated', description: `${editingService.name} has been successfully updated.`});
  };
  
    const handleRemoveService = (id: number) => {
        const serviceName = services.find(s => s.id === id)?.name;
        setServices(services.filter(s => s.id !== id));
        toast({ title: 'Service Removed', description: `${serviceName} has been removed.`});
    };

  const analyticsData = useMemo(() => {
    switch(analyticsTimespan) {
        case 'daily': return dailyData;
        case 'monthly': return monthlyData;
        case 'yearly': return yearlyData;
    }
  }, [analyticsTimespan]);

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
            const renderPlanFields = (billing: BillingCycle | '3-months' | '6-months', plan: PlanName, serviceData: Omit<Service, 'id'> | Service, isEditing: boolean) => {
                const planData = serviceData.plans[billing]?.[plan];
                if (!planData) return null;

                const idPrefix = `${billing}-${plan}`;

                return (
                    <div key={idPrefix} className="p-3 border border-white/20 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-md md:text-lg font-bold text-purple-400">{plan} Plan</h4>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor={`${idPrefix}-available`}>Plan Available</Label>
                                <Switch 
                                    id={`${idPrefix}-available`}
                                    checked={planData.isAvailable}
                                    onCheckedChange={(checked) => handlePlanChange(billing, plan, 'isAvailable', checked, isEditing)}
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2 md:col-span-1">
                                <Label htmlFor={`${idPrefix}-price`}>Price (INR)</Label>
                                <Input 
                                    id={`${idPrefix}-price`}
                                    value={planData.price} 
                                    onChange={(e) => handlePlanChange(billing, plan, 'price', e.target.value, isEditing)}
                                    className="bg-gray-800/50 border-white/20"
                                />
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                {planData.features.map((feature, index) => (
                                    <div key={index} className="space-y-1.5">
                                        <Label htmlFor={`${idPrefix}-feature${index+1}`}>Feature {index + 1}</Label>
                                        <Input 
                                            id={`${idPrefix}-feature${index+1}`}
                                            value={feature}
                                            onChange={(e) => handlePlanChange(billing, plan, `feature${index+1}`, e.target.value, isEditing)}
                                            className="bg-gray-800/50 border-white/20"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            };
            
            const renderPlanForm = (serviceData: Omit<Service, 'id'> | Service, isEditing: boolean) => {
                const targetService = isEditing ? editingService : newService;
                const has3MonthPlan = targetService?.plans['3-months'] && Object.keys(targetService.plans['3-months']).length > 0;
                const has6MonthPlan = targetService?.plans['6-months'] && Object.keys(targetService.plans['6-months']).length > 0;
                const showSpecialHalfYearly = has3MonthPlan || has6MonthPlan;

                return (
                    <Tabs defaultValue="monthly" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            <TabsTrigger value="half-yearly">
                                {showSpecialHalfYearly ? '3/6 Months' : serviceData.name === 'Netflix' ? '3 Months' : 'Half Yearly'}
                            </TabsTrigger>
                            <TabsTrigger value="yearly">
                                 {serviceData.name === 'Netflix' ? 'Half Yearly' : 'Yearly'}
                            </TabsTrigger>
                        </TabsList>
                        {billingCycles.map(billing => (
                            <TabsContent key={billing} value={billing} className="space-y-4">
                                {showSpecialHalfYearly && billing === 'half-yearly' ? (
                                    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-8">
                                        {/* 3 Months Branch */}
                                        {has3MonthPlan && (
                                          <div className="flex flex-col items-center gap-4 w-full">
                                              <div className="bg-gray-800 text-purple-400 font-bold text-lg px-6 py-2 rounded-full border-2 border-purple-500 w-full text-center">3 Months</div>
                                              <div className="space-y-4 w-full">
                                                  {planNames.map(plan => serviceData.plans['3-months']?.[plan] && renderPlanFields('3-months', plan, serviceData, isEditing))}
                                              </div>
                                          </div>
                                        )}

                                        {has3MonthPlan && has6MonthPlan && (
                                            <>
                                              <div className="w-full h-px bg-white/10 lg:hidden" />
                                              <div className="w-px h-auto bg-white/10 hidden lg:block self-stretch mx-4" />
                                            </>
                                        )}
                                        
                                        {/* 6 Months Branch */}
                                        {has6MonthPlan && (
                                          <div className="flex flex-col items-center gap-4 w-full">
                                              <div className="bg-gray-800 text-green-400 font-bold text-lg px-6 py-2 rounded-full border-2 border-green-500 w-full text-center">6 Months</div>
                                              <div className="space-y-4 w-full">
                                                  {planNames.map(plan => serviceData.plans['6-months']?.[plan] && renderPlanFields('6-months', plan, serviceData, isEditing))}
                                              </div>
                                          </div>
                                        )}
                                    </div>
                                ) : (
                                    planNames.map(plan => renderPlanFields(billing, plan, serviceData, isEditing))
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>
                )
            };


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
                                            <TableHead>Sample Price (Monthly)</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {services.map(service => {
                                            const monthlyPlans = service.plans?.monthly;
                                            const firstPlanKey = monthlyPlans ? (Object.keys(monthlyPlans)[0] as PlanName) : undefined;
                                            const samplePrice = firstPlanKey && monthlyPlans?.[firstPlanKey] ? monthlyPlans[firstPlanKey]?.price : 'N/A';

                                            return (
                                                <TableRow key={service.id}>
                                                    <TableCell><img src={service.icon} alt={service.name} className="w-8 h-8 object-contain" /></TableCell>
                                                    <TableCell className="font-medium">{service.name}</TableCell>
                                                    <TableCell>INR {samplePrice}</TableCell>
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
                                            );
                                        })}
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
                    <CardContent>
                         <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input 
                                    id="currentPassword" 
                                    type="password" 
                                    className="bg-gray-800/50 border-white/20"
                                    value={passwordChange.current}
                                    onChange={(e) => setPasswordChange(p => ({...p, current: e.target.value}))}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input 
                                    id="newPassword" 
                                    type="password" 
                                    className="bg-gray-800/50 border-white/20"
                                    value={passwordChange.new}
                                    onChange={(e) => setPasswordChange(p => ({...p, new: e.target.value}))}
                                    required
                                />
                            </div>
                            <Button type="submit" className="bg-gradient-to-r from-red-500 to-orange-600 w-full">Change Password</Button>
                        </form>
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
