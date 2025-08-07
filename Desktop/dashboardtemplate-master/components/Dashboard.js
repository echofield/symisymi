"use client";

import React, { useEffect, useState } from "react";
import {
  Users, Target, MoreVertical, RefreshCw, TrendingUp,
  Clock, Zap, Info, CheckCircle, ClipboardList, AlertCircle, Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Cell,
} from "recharts";

// Glassmorphism style
const glassStyle = {
  backdropFilter: "blur(10px) saturate(200%)",
  background: "rgba(255, 255, 255, 0.7)",
  border: "1px solid rgba(255, 255, 255, 0.8)",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
  borderRadius: "1rem",
};

// Mock API
const mockApi = {
  getDashboardData: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          stats: {
            clientsOnTrack: 14,
            avgProgressScore: 85,
            newLeadsThisMonth: 124,
            avgTimeInPlan: 45,
          },
          monthlyEngagement: [
            { month: "Jan", engagement: 300 },
            { month: "Feb", engagement: 450 },
            { month: "Mar", engagement: 620 },
            { month: "Apr", engagement: 580 },
            { month: "May", engagement: 750 },
            { month: "Jun", engagement: 910 },
          ],
          contentPerformance: [
            { name: "Blog Posts", value: 35, color: "#8B5CF6" },
            { name: "Videos", value: 25, color: "#14B8A6" },
            { name: "Case Studies", value: 20, color: "#3B82F6" },
            { name: "Social Media", value: 20, color: "#F59E0B" },
          ],
          upcomingMilestones: [
            { name: "Define Buyer Persona", progress: 100 },
            { name: "Develop Social Media Strategy", progress: 85 },
            { name: "Launch Lead Generation Campaign", progress: 20 },
            { name: "Create 7-Day Content Plan", progress: 50 },
          ],
          recentActivity: [
            { client: "Jane Doe", action: 'Completed "Develop Social Media Strategy"', status: "completed" },
            { client: "Acme Corp", action: "Requested a call about advanced SEO", status: "info" },
            { client: "Marketing Masters", action: "Uploaded a new content asset", status: "completed" },
            { client: "John Smith", action: 'Failed to complete "Week 2 Tasks"', status: "alert" },
          ],
        });
      }, 500);
    }),
};

// Status helpers
const statusClasses = (s) =>
  s === "completed" ? "bg-green-100 text-green-700"
  : s === "info"    ? "bg-blue-100 text-blue-700"
  : s === "alert"   ? "bg-red-100 text-red-700"
  :                   "bg-yellow-100 text-yellow-700";

const statusIcon = (s) =>
  s === "completed" ? <CheckCircle className="w-4 h-4 text-green-500" />
  : s === "info"    ? <Info className="w-4 h-4 text-blue-500" />
  : s === "alert"   ? <AlertCircle className="w-4 h-4 text-red-500" />
  :                   <ClipboardList className="w-4 h-4 text-yellow-500" />;

export default function MarketingDashboard() {
  const [mounted, setMounted] = useState(false); // avoids SSR→CSR chart glitches
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState(""); // string avoids hydration mismatch
  const [prompt, setPrompt] = useState(null);
  const [promptBusy, setPromptBusy] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    (async () => {
      setIsLoading(true);
      try {
        const resp = await mockApi.getDashboardData();
        if (cancelled) return;
        setData(resp);
        setUpdatedAt(new Date().toLocaleTimeString());

        const done = resp.recentActivity.find((a) => a.status === "completed");
        if (done) {
          setPromptBusy(true);
          setTimeout(() => {
            if (cancelled) return;
            const first = done.client.split(" ")[0];
            setPrompt({
              client: done.client,
              message: `Hi ${first}, great job completing your task! This is an important milestone. Would you like to discuss next steps?`,
            });
            setPromptBusy(false);
          }, 500);
        } else {
          setPrompt(null);
        }
      } catch (e) {
        console.error("Dashboard fetch error", e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [mounted]);

  const reload = () => {
    setMounted(false);
    setTimeout(() => setMounted(true), 0);
  };

  if (!mounted) return null;
  if (!data) {
    return (
      <div className="py-16 text-center text-gray-500">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
        Loading dashboard…
      </div>
    );
  }

  const { stats, monthlyEngagement, contentPerformance, upcomingMilestones, recentActivity } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sadia K</h1>
          <p className="text-gray-500 mt-1">Guided implementation and progress tracking for clients.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={reload}
            disabled={isLoading}
            className="p-2 rounded-lg bg-white/50 hover:bg-white/80 border transition"
          >
            <RefreshCw className={`w-4 h-4 text-gray-600 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <div className="px-4 py-2 bg-white/50 rounded-lg border text-sm text-gray-600">
            Updated: {updatedAt}
          </div>
        </div>
      </div>

      {/* Suggested Prompt */}
      {prompt && (
        <div className="rounded-2xl p-6" style={glassStyle}>
          <div className="flex gap-4">
            <Sparkles className="w-6 h-6 text-purple-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">Suggested Prompt for {prompt.client}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {promptBusy ? "Generating personalized message…" : "The system has detected a key moment and drafted a message."}
              </p>
              {!promptBusy && (
                <>
                  <div className="p-4 bg-white/50 rounded-lg border mb-3">{prompt.message}</div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setPrompt(null)} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm">Dismiss</button>
                    <button onClick={() => alert(`Prompt sent to ${prompt.client}!`)} className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">Send Prompt</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Users className="w-6 h-6 text-white" />, bg: "bg-gradient-to-br from-purple-500 to-pink-500", label: "Clients On Track", value: stats.clientsOnTrack, change: "+12%", color: "text-green-600" },
          { icon: <Target className="w-6 h-6 text-white" />, bg: "bg-gradient-to-br from-blue-500 to-teal-500", label: "Avg. Progress Score", value: `${stats.avgProgressScore}%`, change: "+8%", color: "text-green-600" },
          { icon: <Zap className="w-6 h-6 text-white" />, bg: "bg-gradient-to-br from-teal-500 to-green-500", label: "New Leads This Month", value: stats.newLeadsThisMonth, change: "-5%", color: "text-red-600" },
          { icon: <Clock className="w-6 h-6 text-white" />, bg: "bg-gradient-to-br from-orange-500 to-red-500", label: "Avg. Time in Plan", value: `${stats.avgTimeInPlan} days`, change: "+2 days", color: "text-green-600" },
        ].map((c, i) => (
          <div key={i} className="rounded-2xl p-6" style={glassStyle}>
            <div className="flex justify-between items-center">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${c.bg}`}>{c.icon}</div>
              <div className={`flex items-center ${c.color}`}>
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">{c.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-gray-800">{c.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-2xl p-6" style={glassStyle}>
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Monthly Engagement</h3>
            <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer hover:bg-gray-200/50 rounded" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyEngagement}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <Area type="monotone" dataKey="engagement" stroke="#8B5CF6" fill="url(#grad1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 rounded-2xl p-6" style={glassStyle}>
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Content Performance</h3>
            <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer hover:bg-gray-200/50 rounded" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={contentPerformance} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={5}>
                {contentPerformance.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {contentPerformance.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6" style={glassStyle}>
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Upcoming Milestones</h3>
          </div>
          <div className="space-y-4">
            {upcomingMilestones.map((m, idx) => (
              <div key={idx}>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{m.name}</span>
                  <span className="text-sm font-semibold text-gray-800">{m.progress}%</span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 bg-purple-500 rounded-full" style={{ width: `${m.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6" style={glassStyle}>
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Recent Client Activity</h3>
            <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((a, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 hover:bg-gray-200/20 rounded transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{a.client.substring(0, 2).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{a.client}</p>
                    <p className="text-sm text-gray-500">{a.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {statusIcon(a.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses(a.status)}`}>{a.status}</span>
                  </div>
                  <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer hover:bg-gray-200/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
