
"use client";

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const logo = PlaceHolderImages.find(p => p.id === 'logo');

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <Header />
            <div className="bg-gradient-to-b from-[#0E0E10] to-[#1B1C1E] text-white min-h-screen pt-28">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-center mb-8 heading-light-sweep">Your Shopping Cart</h1>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-20">
                             {logo && (
                                <Image
                                    src={logo.imageUrl}
                                    alt={logo.description}
                                    data-ai-hint={logo.imageHint}
                                    width={100}
                                    height={100}
                                    className={cn('brightness-0 invert mb-4 rounded-full mx-auto animate-pulse')}
                                />
                            )}
                            <p className="text-2xl text-gray-400">Your cart is empty.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="bg-gray-900/50 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <h2 className="text-lg font-bold">{item.name}</h2>
                                                <p className="text-gray-400 text-sm">₹{item.price.toFixed(2)} {item.period}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 border border-white/20 rounded-full px-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-500/10 rounded-full" onClick={() => removeFromCart(item.id)}>
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6 h-fit">
                                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span>Taxes & Fees</span>
                                    <span>--</span>
                                </div>
                                <div className="border-t border-white/20 my-4"></div>
                                <div className="flex justify-between font-bold text-xl mb-6">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                                <Button size="lg" className="w-full font-bold bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:scale-105 transition-transform">
                                    Buy Now
                                </Button>
                                 <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={clearCart}>
                                    Clear Cart
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
