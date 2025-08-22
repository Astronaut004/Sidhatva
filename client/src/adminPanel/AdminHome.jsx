
// src/AdminPanel/AdminHome.jsx
import { useState } from "react";
import { Home, ShoppingBag, Users, DollarSign, BarChart2, ChevronDown, Bell, User as UserIcon } from "lucide-react";

const AdminHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${!sidebarOpen && 'hidden'}`}>Admin</h1>
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <Home className="mr-2" />
              <span className={`${!sidebarOpen && 'hidden'}`}>Dashboard</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <ShoppingBag className="mr-2" />
              <span className={`${!sidebarOpen && 'hidden'}`}>Products</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <Users className="mr-2" />
              <span className={`${!sidebarOpen && 'hidden'}`}>Customers</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <DollarSign className="mr-2" />
              <span className={`${!sidebarOpen && 'hidden'}`}>Orders</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <BarChart2 className="mr-2" />
              <span className={`${!sidebarOpen && 'hidden'}`}>Analytics</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center">
            <Bell className="mr-4 text-gray-600" />
            <div className="flex items-center">
              <UserIcon className="mr-2 text-gray-600" />
              <span>Admin Name</span>
              <ChevronDown className="ml-1 text-gray-600" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <DollarSign className="text-4xl text-green-500 mr-4" />
              <div>
                <p className="text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">$45,231.89</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <ShoppingBag className="text-4xl text-blue-500 mr-4" />
              <div>
                <p className="text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold">+1,234</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <Users className="text-4xl text-yellow-500 mr-4" />
              <div>
                <p className="text-gray-600">New Customers</p>
                <p className="text-2xl font-bold">+345</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <BarChart2 className="text-4xl text-purple-500 mr-4" />
              <div>
                <p className="text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">12.5%</p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="pb-2">Order ID</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2">#12345</td>
                  <td className="py-2">John Doe</td>
                  <td className="py-2">$129.99</td>
                  <td className="py-2"><span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">Completed</span></td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">#12346</td>
                  <td className="py-2">Jane Smith</td>
                  <td className="py-2">$49.99</td>
                  <td className="py-2"><span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Pending</span></td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">#12347</td>
                  <td className="py-2">Peter Jones</td>
                  <td className="py-2">$249.00</td>
                  <td className="py-2"><span className="bg-red-200 text-red-800 px-2 py-1 rounded-full">Cancelled</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
