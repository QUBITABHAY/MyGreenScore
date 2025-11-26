import Link from 'next/link';
import { Leaf, TrendingDown, Target, Shield, ArrowRight, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative">
          <div className="text-center space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-300 text-sm font-medium">
              <Leaf className="w-4 h-4" />
              <span>AI-Powered Carbon Tracking</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Track Your{' '}
              <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Environmental Footprint
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300">
              Make data-driven decisions to reduce your carbon emissions. Get personalized insights,
              set goals, and track your progress toward a sustainable future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/assess"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-emerald-600 to-green-600 text-white rounded-full font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
              >
                Start Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-full font-semibold border-2 border-gray-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:-translate-y-0.5 transition-all"
              >
                View Dashboard
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">AI</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Powered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">Real-time</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Tracking</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">Smart</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Insights</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Go Green
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Comprehensive tools to measure, track, and reduce your environmental impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group p-6 bg-linear-to-br from-emerald-50 to-green-50 dark:from-slate-800 dark:to-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Assess Impact</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Calculate CO2e emissions from your activities with AI-powered categorization
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 bg-linear-to-br from-emerald-50 to-green-50 dark:from-slate-800 dark:to-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Trends</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Visualize your emissions over time with interactive charts and insights
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 bg-linear-to-br from-emerald-50 to-green-50 dark:from-slate-800 dark:to-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Set Goals</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Define reduction targets and monitor your progress toward sustainability
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 bg-linear-to-br from-emerald-50 to-green-50 dark:from-slate-800 dark:to-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Your data is yours. Export or delete anytime with full transparency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-emerald-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg mb-8 text-emerald-50">
            Join the journey toward a sustainable future. Start tracking your carbon footprint today.
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

