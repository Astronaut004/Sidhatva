import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

import {
  Home, Package, Tag, Users, ShoppingCart, TrendingUp, DollarSign, Eye, Settings,
  Bell, Search, Filter, Plus, MoreVertical, ArrowUp, ArrowDown, Calendar, Download,
  Star, Heart, MessageSquare, AlertTriangle, CheckCircle, Clock, Zap, Menu, X
} from 'lucide-react';

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Animation effect for stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        revenue: 37200,
        orders: 179,
        customers: 1247,
        products: 523
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const salesData = [
    { month: 'Jan', sales: 65, revenue: 4500, orders: 23, growth: 12 },
    { month: 'Feb', sales: 59, revenue: 5200, orders: 19, growth: 8 },
    { month: 'Mar', sales: 80, revenue: 6100, orders: 32, growth: 22 },
    { month: 'Apr', sales: 81, revenue: 5800, orders: 28, growth: 18 },
    { month: 'May', sales: 56, revenue: 4900, orders: 21, growth: 5 },
    { month: 'Jun', sales: 55, revenue: 5400, orders: 25, growth: 15 },
    { month: 'Jul', sales: 70, revenue: 6200, orders: 31, growth: 28 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#6366f1', revenue: 15400 },
    { name: 'Fashion', value: 28, color: '#ec4899', revenue: 12200 },
    { name: 'Books', value: 20, color: '#06b6d4', revenue: 8900 },
    { name: 'Home & Garden', value: 17, color: '#10b981', revenue: 7500 },
  ];

  const recentOrders = [
    { id: '#ORD-12345', customer: 'John Doe', avatar: '👨', amount: '$129.99', status: 'Completed', date: '2 mins ago', items: 3 },
    { id: '#ORD-12346', customer: 'Jane Smith', avatar: '👩', amount: '$85.50', status: 'Processing', date: '5 mins ago', items: 1 },
    { id: '#ORD-12347', customer: 'Mike Johnson', avatar: '👨‍💼', amount: '$199.99', status: 'Shipped', date: '1 hour ago', items: 2 },
    { id: '#ORD-12348', customer: 'Sarah Wilson', avatar: '👩‍🦰', amount: '$67.25', status: 'Pending', date: '2 hours ago', items: 4 },
    { id: '#ORD-12349', customer: 'David Chen', avatar: '👨‍💻', amount: '$299.99', status: 'Completed', date: '3 hours ago', items: 1 },
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro', sales: 145, revenue: '$145,000', trend: 'up' },
    { name: 'MacBook Air M3', sales: 89, revenue: '$89,000', trend: 'up' },
    { name: 'AirPods Pro', sales: 234, revenue: '$58,500', trend: 'down' },
    { name: 'iPad Air', sales: 156, revenue: '$93,600', trend: 'up' },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, badge: null },
    { id: 'products', label: 'Products', icon: Package, badge: '523' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: '12' },
    { id: 'customers', label: 'Customers', icon: Users, badge: null },
    { id: 'categories', label: 'Categories', icon: Tag, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  useEffect(() => {
    // basic client-side product search
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setFilteredProducts(topProducts);
    } else {
      setFilteredProducts(topProducts.filter(p => p.name.toLowerCase().includes(q)));
    }
  }, [searchQuery]);

  // init filtered products
  useEffect(() => setFilteredProducts(topProducts), []);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Completed': return { color: 'text-emerald-700 bg-emerald-100 border-emerald-200', icon: CheckCircle };
      case 'Processing': return { color: 'text-blue-700 bg-blue-100 border-blue-200', icon: Clock };
      case 'Shipped': return { color: 'text-purple-700 bg-purple-100 border-purple-200', icon: Zap };
      case 'Pending': return { color: 'text-amber-700 bg-amber-100 border-amber-200', icon: AlertTriangle };
      default: return { color: 'text-gray-700 bg-gray-100 border-gray-200', icon: Clock };
    }
  };

  const AnimatedStatCard = ({ icon: Icon, title, value, change, gradient, delay = 0 }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        let current = 0;
        const increment = Math.max(1, Math.floor(value / 50));
        const counter = setInterval(() => {
          current += increment;
          if (current >= value) {
            current = value;
            clearInterval(counter);
          }
          setDisplayValue(Math.floor(current));
        }, 20);
        return () => clearInterval(counter);
      }, delay);
      return () => clearTimeout(timer);
    }, [value, delay]);

    return (
      <div className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${gradient}`}>
        <div className="absolute inset-0 opacity-10" />
        <div className="relative p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium uppercase tracking-wide">{title}</p>
              <p className="text-3xl font-bold mt-2">
                {title.toLowerCase().includes('revenue') ? '$' : ''}{displayValue.toLocaleString()}
              </p>
              {change && (
                <div className="flex items-center mt-2">
                  {change.startsWith('+') ? (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{change} from last month</span>
                </div>
              )}
            </div>
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Icon className="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
          <div className="h-full bg-white/60 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
        </div>
      </div>
    );
  };

  const GlassCard = ({ children, className = "" }) => (
    <div className={`bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 ${className}`}>
      {children}
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Admin! 👋</h1>
          <p className="text-xl text-white/90">Here's what's happening with your business today.</p>
          <div className="mt-6 flex space-x-4">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-medium transition-all duration-300">
              View Reports
            </button>
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition-all duration-300">
              Quick Actions
            </button>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Animated Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedStatCard
          icon={DollarSign}
          title="Total Revenue"
          value={animatedStats.revenue || 0}
          change="+12.3%"
          gradient="bg-gradient-to-br from-emerald-400 to-emerald-600"
          delay={0}
        />
        <AnimatedStatCard
          icon={ShoppingCart}
          title="Total Orders"
          value={animatedStats.orders || 0}
          change="+8.7%"
          gradient="bg-gradient-to-br from-blue-400 to-blue-600"
          delay={200}
        />
        <AnimatedStatCard
          icon={Users}
          title="Total Customers"
          value={animatedStats.customers || 0}
          change="+15.2%"
          gradient="bg-gradient-to-br from-purple-400 to-purple-600"
          delay={400}
        />
        <AnimatedStatCard
          icon={Package}
          title="Total Products"
          value={animatedStats.products || 0}
          change="+4.1%"
          gradient="bg-gradient-to-br from-orange-400 to-orange-600"
          delay={600}
        />
      </div>

      {/* Advanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Sales Performance</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">7D</button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">30D</button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">90D</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#salesGradient)"
                  strokeWidth={3}
                  name="Sales"
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ec4899"
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  strokeWidth={3}
                  name="Revenue (x100)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <span className="text-sm font-medium text-blue-800">Avg. Order Value</span>
                <span className="text-lg font-bold text-blue-900">$94.50</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <span className="text-sm font-medium text-green-800">Conversion Rate</span>
                <span className="text-lg font-bold text-green-900">3.2%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <span className="text-sm font-medium text-purple-800">Customer Satisfaction</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-lg font-bold text-purple-900">4.8</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Enhanced Recent Orders */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <ShoppingCart className="w-6 h-6 mr-2 text-blue-600" />
            Recent Orders
          </h3>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Order</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Time</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.items} items</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg">
                          {order.avatar}
                        </div>
                        <span className="font-medium text-gray-900">{order.customer}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">{order.amount}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{order.date}</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Top Products */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Star className="w-6 h-6 mr-2 text-yellow-500" />
          Top Performing Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map((product, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.sales} units sold</p>
                  <p className="text-lg font-bold text-green-600 mt-1">{product.revenue}</p>
                </div>
                <div className={`p-2 rounded-lg ${product.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {product.trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.trend === "up"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {product.trend === "up" ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                  {product.trend === "up" ? "Trending Up" : "Trending Down"}
                </span>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Last 30 days</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="revenueAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#revenueAreaGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Growth Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar
                dataKey="growth"
                /* Note: recharts accepts fill color directly */
                fill="#8b5cf6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Product Management</h2>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Products', value: '523', icon: Package, color: 'from-blue-500 to-blue-600' },
          { title: 'Active Products', value: '498', icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { title: 'Out of Stock', value: '12', icon: AlertTriangle, color: 'from-red-500 to-red-600' },
          { title: 'Low Stock', value: '28', icon: Clock, color: 'from-yellow-500 to-yellow-600' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`p-6 bg-gradient-to-br ${stat.color} rounded-2xl text-white transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-white/80" />
              </div>
            </div>
          );
        })}
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Product Inventory</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Units Sold: {product.sales}</p>
                <p className="text-sm text-gray-600">Revenue: {product.revenue}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.trend === "up"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {product.trend === "up" ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                  {product.trend === "up" ? "Trending Up" : "Trending Down"}
                </span>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 min-h-screen p-4 transition-all ${sidebarCollapsed ? 'w-20' : 'w-72'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-500 to-pink-500 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold">
                A
              </div>
              {!sidebarCollapsed && <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Admin Panel</h3>
                <p className="text-sm text-gray-500">Control center</p>
              </div>}
            </div>
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between group p-3 rounded-lg transition-colors ${active ? 'bg-blue-50 dark:bg-blue-600/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-md ${active ? 'bg-blue-100 dark:bg-blue-600' : 'bg-transparent'}`}>
                      <Icon className={`w-5 h-5 ${active ? 'text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`} />
                    </div>
                    {!sidebarCollapsed && <span className={`font-medium text-sm ${active ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge && <div className="text-xs font-semibold text-white bg-blue-600 px-2 py-0.5 rounded-full">{item.badge}</div>}
                </button>
              );
            })}
          </nav>

          <div className="mt-6">
            {!sidebarCollapsed && (
              <>
                <hr className="border-gray-200 dark:border-gray-700 my-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Notifications</p>
                      <p className="text-xs text-gray-500">You have {notifications} unread</p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{notifications}</div>
                </div>
              </>
            )}
          </div>

          <div className="mt-auto pt-6">
            {!sidebarCollapsed && (
              <div className="text-sm text-gray-500">
                <button
                  onClick={() => setIsDarkMode(prev => !prev)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Toggle {isDarkMode ? 'Light' : 'Dark'}
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{activeTab}</h1>
              <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-lg p-2">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input placeholder="Search everything..." className="outline-none text-sm" onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="w-5 h-5" />
                {notifications > 0 && <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">{notifications}</span>}
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center">A</div>
                <div className="hidden sm:block text-sm">
                  <div className="font-medium text-gray-900 dark:text-white">Admin</div>
                  <div className="text-xs text-gray-500">admin@company.com</div>
                </div>
              </div>
            </div>
          </header>

          {/* content area */}
          <div className="bg-transparent">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Orders</h2>
                <GlassCard className="p-6">
                  <p className="text-sm text-gray-600">Orders list and management go here. (You can reuse the Recent Orders table above or connect to an API.)</p>
                </GlassCard>
              </div>
            )}
            {activeTab === 'customers' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Customers</h2>
                <GlassCard className="p-6">
                  <p className="text-sm text-gray-600">Customers management / list / profiles go here.</p>
                </GlassCard>
              </div>
            )}
            {activeTab === 'categories' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Categories</h2>
                <GlassCard className="p-6">
                  <p className="text-sm text-gray-600">Categories management UI.</p>
                </GlassCard>
              </div>
            )}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Product Inventory</h3>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Export</span>
                    </button>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-3 px-6 font-semibold text-gray-700">Product</th>
                          <th className="text-left py-3 px-6 font-semibold text-gray-700">Category</th>
                          <th className="text-left py-3 px-6 font-semibold text-gray-700">Stock</th>
                          <th className="text-left py-3 px-6 font-semibold text-gray-700">Price</th>
                          <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                          <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "iPhone 15 Pro", category: "Electronics", stock: 120, price: "$999", status: "Active" },
                          { name: "MacBook Air M3", category: "Electronics", stock: 45, price: "$1299", status: "Active" },
                          { name: "AirPods Pro", category: "Electronics", stock: 0, price: "$249", status: "Out of Stock" },
                          { name: "iPad Air", category: "Electronics", stock: 12, price: "$599", status: "Low Stock" }
                        ].map((p, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                            <td className="py-3 px-6 font-medium text-gray-900">{p.name}</td>
                            <td className="py-3 px-6 text-gray-700">{p.category}</td>
                            <td className="py-3 px-6">{p.stock}</td>
                            <td className="py-3 px-6 font-bold text-gray-900">{p.price}</td>
                            <td className="py-3 px-6">
                              <span
                                className={`px-3 py-1 text-xs font-medium rounded-full ${p.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : p.status === "Low Stock"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                              >
                                {p.status}
                              </span>
                            </td>
                            <td className="py-3 px-6">
                              <div className="flex space-x-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>

              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHome;

// i don't want redcharts, lucide-react