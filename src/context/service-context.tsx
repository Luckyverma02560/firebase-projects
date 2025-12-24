
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { initialServices, type Service } from '@/lib/services';

const STORAGE_KEY = 'el11ven-hub-services';

interface ServiceContextType {
    services: Service[];
    setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const storedServices = localStorage.getItem(STORAGE_KEY);
            if (storedServices) {
                setServices(JSON.parse(storedServices));
            }
        } catch (error) {
            console.error("Failed to load services from localStorage", error);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
            } catch (error) {
                console.error("Failed to save services to localStorage", error);
            }
        }
    }, [services, isInitialized]);

    return (
        <ServiceContext.Provider value={{ services, setServices }}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useServices = () => {
    const context = useContext(ServiceContext);
    if (context === undefined) {
        throw new Error('useServices must be used within a ServiceProvider');
    }
    return context;
};
