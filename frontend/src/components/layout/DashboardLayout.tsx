import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Hexagon, 
  LayoutDashboard, 
  Target, 
  FileText, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../ui/LanguageSelector';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Loan Assessment Completed', message: 'Your alternative credit score is ready.', read: false, time: '2m ago' },
    { id: 2, title: 'Documents Uploaded', message: 'Bank statements successfully verified.', read: false, time: '1h ago' },
    { id: 3, title: 'Profile Updated', message: 'Your KYC details have been securely saved.', read: true, time: '1d ago' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const navItems = [
    { label: t('navbar.dashboard') || 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Credit Assessment', path: '/kyc', icon: Target },
    { label: t('dashboard.uploadDocuments') || 'Documents', path: '/upload-documents', icon: FileText },
    { label: t('navbar.profile') || 'Profile', path: '/profile', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row font-sans text-foreground">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-border shadow-sm
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-border flex-shrink-0">
          <Link to="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <Hexagon className="text-secondary w-6 h-6 mr-2" />
            <span className="font-heading font-extrabold text-xl text-primary tracking-tight">FIBO</span>
          </Link>
          <button className="ml-auto md:hidden text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-primary/5 text-primary font-semibold' 
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }
                `}
              >
                <Icon size={18} className={isActive ? 'text-secondary' : 'text-muted-foreground'} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-border flex-shrink-0 space-y-4">
          <LanguageSelector className="w-full" />
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            <span className="font-medium">{t('navbar.logout') || 'Logout'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-muted-foreground" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            
            {/* Search Bar */}
            <div className="hidden sm:flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2 border border-border focus-within:border-primary/30 focus-within:bg-white transition-all w-64 lg:w-96">
              <Search size={16} className="text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search transactions, reports..." 
                className="bg-transparent border-none outline-none w-full text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Live Environment</span>
            </div>
            
            <div className="relative">
              <button 
                className="relative text-muted-foreground hover:text-foreground transition-colors p-2"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                )}
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-border z-50 overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
                    <h4 className="font-bold">Notifications</h4>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-secondary hover:underline font-medium">Mark all read</button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => markRead(n.id)}
                          className={`px-4 py-3 border-b border-border/50 cursor-pointer hover:bg-muted/30 transition-colors ${!n.read ? 'bg-emerald-50/30' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h5 className={`text-sm ${!n.read ? 'font-bold text-foreground' : 'font-medium text-muted-foreground'}`}>{n.title}</h5>
                            <span className="text-[10px] text-muted-foreground ml-2 whitespace-nowrap">{n.time}</span>
                          </div>
                          <p className={`text-xs ${!n.read ? 'text-foreground/80' : 'text-muted-foreground'}`}>{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 border-t border-border bg-muted/10 text-center">
                      <button onClick={clearNotifications} className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors">Clear all</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-border"></div>

            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate('/profile')}
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold transition-colors group-hover:bg-primary/20">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">{user?.email?.split('@')[0] || 'User'}</p>
                <p className="text-xs text-muted-foreground">Premium Account</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
