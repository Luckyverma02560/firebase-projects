
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityViewProps {
    currentPassword?: string;
    onPasswordChange: (newPassword: string) => void;
}

export default function SecurityView({ currentPassword, onPasswordChange }: SecurityViewProps) {
    const { toast } = useToast();
    const [passwordChange, setPasswordChange] = useState({ current: '', new: '' });

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordChange.current !== currentPassword) {
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
        onPasswordChange(passwordChange.new);
        setPasswordChange({current: '', new: ''});
        toast({
            title: "Success",
            description: "Your password has been changed successfully.",
        });
    };

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
}
