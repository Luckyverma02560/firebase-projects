
import { PaymentIcons } from '@/components/payment-icons';
import { HeroParticles } from '@/components/hero-particles';
import { UpwardNeonParticles } from '@/components/upward-neon-particles';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { AlertCircle } from 'lucide-react';

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
            Your transactions are safe with us. Please follow the steps below to complete your subscription.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-left">
              <h2 className="text-2xl font-bold text-white">Payment Information</h2>
              <p className="text-gray-300">
                You can use the details below for payment via any UPI app or Netbanking after confirming your plan on WhatsApp.
              </p>
              
              <div className="space-y-2">
                <div className="bg-gray-800/50 border border-white/20 rounded-lg p-4 flex items-center justify-between">
                  <span className="font-mono text-lg text-green-400">+91 86000 70638</span>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
                 <div className="bg-gray-800/50 border border-white/20 rounded-lg p-4 flex items-center justify-between">
                  <span className="font-mono text-lg text-green-400">8600070638@axl</span>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
              </div>

               <p className="text-xs text-gray-500 pt-2">
                 <span className="font-bold text-yellow-400">Important:</span> Please chat with us on WhatsApp first to select your subscription plan. After confirmation, you can make the payment and share a screenshot to receive your account details instantly.
               </p>
            </div>

            <div className="flex justify-center items-center bg-gray-800/50 rounded-lg p-4 border border-dashed border-white/20 aspect-square">
              {qrCodePlaceholder && (
                <Image
                  src={qrCodePlaceholder.imageUrl}
                  alt={qrCodePlaceholder.description}
                  data-ai-hint={qrCodePlaceholder.imageHint}
                  width={230}
                  height={230}
                  className="rounded-md object-contain"
                />
              )}
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <div className="flex items-center justify-center text-yellow-400 mb-2">
                <AlertCircle className="h-5 w-5 mr-2" />
                <h3 className="text-lg font-bold">Disclaimer</h3>
            </div>
            <p className="text-xs text-gray-400 max-w-lg mx-auto">
              This service is not licensed or governed by any governmental authority. All payments are secure but non-refundable. The information provided on this page is for payment purposes only. Users must first contact us via WhatsApp to select a specific subscription before making any payment.
            </p>
          </div>

          <div className="mt-12">
            <PaymentIcons />
          </div>
        </div>
      </div>
    </div>
  );
}
