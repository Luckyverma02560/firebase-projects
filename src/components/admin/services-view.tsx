
'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Pencil, Trash2, Settings } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogTrigger, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from '@/components/ui/switch';
import { generateDefaultPlans, planNames, billingCycles, type Service, type PlanName, type BillingCycle } from '@/lib/services';
import { useToast } from '@/hooks/use-toast';
import { useServices } from '@/context/service-context';


export default function ServicesView() {
    const { toast } = useToast();
    const { services, setServices } = useServices();
  
    const [newService, setNewService] = useState<Omit<Service, 'id'>>({
        name: '',
        icon: '',
        plans: generateDefaultPlans(),
    });
  
    const [editingService, setEditingService] = useState<Service | null>(null);
  
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
  
  
    const handleAddService = (e: FormEvent<HTMLFormElement>) => {
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
  
    const handleUpdateService = (e: FormEvent<HTMLFormElement>) => {
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
}
