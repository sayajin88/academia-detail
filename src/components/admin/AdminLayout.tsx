import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, FileText, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: "/admin/applications", label: "Solicitudes", icon: FileText },
  { href: "/admin/profiles", label: "Perfiles", icon: Users },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { loading, isAdmin, logout } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              <span className="font-semibold">Admin Panel</span>
            </div>
            <nav className="flex items-center gap-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} to={href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "gap-1.5",
                      location.pathname === href && "bg-muted text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" /> Cerrar sesión
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
