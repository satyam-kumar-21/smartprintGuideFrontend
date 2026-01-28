import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';

const AdminAnalytics = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
                <p className="text-slate-500">Overview of your store's performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Revenue', value: '$54,239', change: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
                    { label: 'Total Orders', value: '1,253', change: '+8.2%', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { label: 'Active Users', value: '892', change: '+5.1%', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
                    { label: 'Avg. Order Value', value: '$43.20', change: '-2.1%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                            <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
                                <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                                    {stat.change}
                                </span>
                                <span className="text-slate-400">vs last month</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Placeholder for Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80 flex items-center justify-center text-slate-400 bg-slate-50/50">
                    Revenue Chart Placeholder
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80 flex items-center justify-center text-slate-400 bg-slate-50/50">
                    Traffic Source Placeholder
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
