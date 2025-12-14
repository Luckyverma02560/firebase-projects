
import { PaymentIcons } from '@/components/payment-icons';
import { HeroParticles } from '@/components/hero-particles';
import { UpwardNeonParticles } from '@/components/upward-neon-particles';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function PaymentPage() {
  const qrCodePlaceholder = PlaceHolderImages.find(p => p.id === 'qr-code-placeholder');

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E10] to-[#1B1C1E] z-0" />
      <div className="absolute inset-0 z-1 pointer-events-none">
        <HeroParticles />
        <UpwardNeonParticles />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-500/10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 heading-light-sweep">
            Secure & Simple Payments
          </h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Your transactions are safe with us. Pay seamlessly using your favorite UPI app or Netbanking.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-left">
              <h2 className="text-2xl font-bold text-white">Payment Details</h2>
              <p className="text-gray-300">Scan the QR code with any UPI app or pay directly to the number below.</p>
              
              <div className="bg-gray-800/50 border border-white/20 rounded-lg p-4 flex items-center justify-between">
                <span className="font-mono text-lg text-green-400">+91 86000 70638</span>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Copy className="h-5 w-5" />
                </Button>
              </div>

               <p className="text-xs text-gray-500 pt-2">After payment, please send a screenshot to our WhatsApp for confirmation to get your account details instantly.</p>
            </div>

            <div className="flex justify-center items-center bg-gray-800/50 rounded-lg p-4 border border-dashed border-white/20 h-52">
                {qrCodePlaceholder ? (
                    <Image 
                        src={qrCodePlaceholder.imageUrl}
                        alt={qrCodePlaceholder.description}
                        data-ai-hint={qrCodePlaceholder.imageHint}
                        width={180}
                        height={180}
                        className="rounded-md"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-500">QR Code</p>
                    </div>
                )}
            </div>
          </div>

          <div className="mt-12">
            <PaymentIcons />
          </div>
        </div>
      </div>
    </div>
  );
}
