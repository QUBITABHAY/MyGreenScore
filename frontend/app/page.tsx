import Link from 'next/link';
import { Leaf, TrendingDown, Target, Shield, ArrowRight, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-white to-green-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative">
          <div className="text-center space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium">
              <Leaf className="w-4 h-4" />
              <span>🌍 Fighting Climate Change Together</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900">
              Every Action{' '}
              <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Counts for Our Planet
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600">
              Climate change is real, but so is your power to fight it. Track your carbon footprint,
              understand your impact, and take meaningful action to reduce emissions.
              <span className="font-semibold text-emerald-600"> Small changes create big impact.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/assess"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-emerald-600 to-green-600 text-white rounded-full font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
              >
                Calculate My Impact
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-semibold border-2 border-gray-200 hover:border-emerald-500 hover:-translate-y-0.5 transition-all"
              >
                View Dashboard
              </Link>
            </div>

            {/* Climate Impact Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">1.5°C</div>
                <div className="text-sm text-slate-600">Global warming limit</div>
                <div className="text-xs text-slate-500 mt-1">We must act now</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">40B+</div>
                <div className="text-sm text-slate-600">Tons CO₂ yearly</div>
                <div className="text-xs text-slate-500 mt-1">Your actions matter</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">2030</div>
                <div className="text-sm text-slate-600">Critical decade</div>
                <div className="text-xs text-slate-500 mt-1">Join the movement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">
              Take Action Against Climate Change
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every kilogram of CO₂ you reduce helps preserve our planet for future generations.
              <span className="font-semibold text-emerald-600"> Start your climate journey today.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group p-6 bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Measure Your Impact</h3>
              <p className="text-slate-600 text-sm">
                Understand how your daily activities contribute to climate change. Knowledge is the first step to action.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Watch Progress</h3>
              <p className="text-slate-600 text-sm">
                See your impact shrink over time. Every reduction is a victory for our planet.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Commit to Change</h3>
              <p className="text-slate-600 text-sm">
                Set ambitious targets to reduce your carbon footprint. Your commitment helps save the Earth.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Privacy First</h3>
              <p className="text-slate-600 text-sm">
                Your data is yours. Export or delete anytime with full transparency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-emerald-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The Time to Act is NOW
          </h2>
          <p className="text-lg mb-8 text-emerald-50">
            Climate change won't wait. Join thousands fighting for our planet's future.
            <span className="font-semibold">Your actions today shape tomorrow's world.</span>
          </p>
          <Link
            href="/assess"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

