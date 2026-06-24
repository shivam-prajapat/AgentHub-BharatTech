import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-neutral-900">Simple, Transparent Pricing</h1>
        <p className="text-lg text-neutral-600">
          Pay only for what you use. Start for free and scale as your AI agent needs grow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Tier */}
        <div className="glass-surface p-8 rounded-[2rem] border border-neutral-200 bg-white">
          <h3 className="text-xl font-bold mb-2">Developer</h3>
          <p className="text-neutral-500 mb-6 h-12">Perfect for trying out agents and testing locally.</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold">$0</span>
            <span className="text-neutral-500">/month</span>
          </div>
          <Button className="w-full mb-8 rounded-full" variant="outline">Get Started Free</Button>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <Check className="w-5 h-5 text-emerald-500" /> 100 free agent calls / month
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <Check className="w-5 h-5 text-emerald-500" /> Community support
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <Check className="w-5 h-5 text-emerald-500" /> Standard execution sandbox
            </div>
          </div>
        </div>

        {/* Pro Tier */}
        <div className="glass-surface p-8 rounded-[2rem] border-2 border-blue-500 bg-blue-50/30 relative">
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Most Popular
          </div>
          <h3 className="text-xl font-bold mb-2">Pro</h3>
          <p className="text-neutral-500 mb-6 h-12">For serious developers shipping AI to production.</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold">$29</span>
            <span className="text-neutral-500">/month</span>
          </div>
          <Button className="w-full mb-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white">Upgrade to Pro</Button>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <Check className="w-5 h-5 text-emerald-500" /> 10,000 free agent calls / month
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <Check className="w-5 h-5 text-emerald-500" /> Priority email support
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <Check className="w-5 h-5 text-emerald-500" /> High-performance execution
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <Check className="w-5 h-5 text-emerald-500" /> Custom API integrations
            </div>
          </div>
        </div>

        {/* Enterprise Tier */}
        <div className="glass-surface p-8 rounded-[2rem] border border-neutral-200 bg-white">
          <h3 className="text-xl font-bold mb-2">Enterprise</h3>
          <p className="text-neutral-500 mb-6 h-12">Custom solutions for large teams and organizations.</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold">Custom</span>
          </div>
          <Button className="w-full mb-8 rounded-full" variant="outline">Contact Sales</Button>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <Check className="w-5 h-5 text-emerald-500" /> Unlimited agent calls
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <Check className="w-5 h-5 text-emerald-500" /> 24/7 dedicated support
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <Check className="w-5 h-5 text-emerald-500" /> VPC deployment options
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <Check className="w-5 h-5 text-emerald-500" /> Custom agent training
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
