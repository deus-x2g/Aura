import { NavLink as RouterNavLink } from "react-router-dom";
import { Home, Brain, Camera, FileWarning, Phone } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/emotion-check", icon: Camera, label: "Check-in" },
  { to: "/fatigue", icon: Brain, label: "Fatigue" },
  { to: "/incident", icon: FileWarning, label: "Report" },
  { to: "/support", icon: Phone, label: "Support" },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="mx-auto max-w-lg flex items-center justify-around px-2 py-1">
        {navItems.map((item) => (
          <RouterNavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-xs transition-all duration-200
              ${isActive
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? "bg-primary/10" : ""}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span>{item.label}</span>
              </>
            )}
          </RouterNavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
