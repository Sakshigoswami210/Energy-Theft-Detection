import { LayoutDashboard, Bell, BarChart3, Settings } from "lucide-react";

const Sidebar = ({ active, setActive }) => {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Analytics", icon: <BarChart3 size={18} /> },
    { name: "Alerts", icon: <Bell size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">⚡ EnergyAI</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={active === item.name ? "active" : ""}
            onClick={() => setActive(item.name)}
          >
            {item.icon} {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;