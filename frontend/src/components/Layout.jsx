```jsx
import { useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  GraduationCap,
  Users,
  ChevronDown,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Download,
  Upload,
} from 'lucide-react';

import { downloadBackup, restoreBackup } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const nav = useNavigate();
  const fileRef = useRef(null);

  // Restore backup data
  const importData = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      await restoreBackup(file);

      alert(
        'Backup restored. Please sign in again with an account from that backup.'
      );

      logout();
      nav('/login');
    } catch (err) {
      alert(err.message);
    } finally {
      e.target.value = '';
    }
  };

  // Logout user
  const leave = () => {
    logout();
    nav('/login');
  };

  return (
    <div className="app-shell">

      {/* Sidebar */}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>

        {/* Brand */}
        <div className="brand">
          <div className="brand-mark">
            <GraduationCap size={22} />
          </div>

          <div>
            <b>DEVIXO</b>
            <small>STUDENT SERVICES</small>
          </div>

          <button
            className="mobile-close"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <div className="nav-label">WORKSPACE</div>

        <NavLink
          onClick={() => setOpen(false)}
          to="/"
          end
          className={({ isActive }) =>
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <LayoutDashboard size={18} />
          Overview
        </NavLink>

        <NavLink
          onClick={() => setOpen(false)}
          to="/students"
          className={({ isActive }) =>
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <Users size={18} />
          Students
        </NavLink>

        {/* Sidebar Bottom */}
        <div className="sidebar-bottom">

          {/* Security Information */}
          <div className="secure-note">
            <ShieldCheck size={17} />

            <div>
              <b>Secure workspace</b>
              <small>Access monitored</small>
            </div>
          </div>

          {/* Backup and Restore */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              margin: '12px 0',
            }}
          >
            <button
              className="nav-item"
              type="button"
              onClick={downloadBackup}
              title="Download a copy of your data"
            >
              <Download size={16} />
              Backup
            </button>

            <button
              className="nav-item"
              type="button"
              onClick={() => fileRef.current?.click()}
              title="Restore a previous backup"
            >
              <Upload size={16} />
              Restore
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              hidden
              onChange={importData}
            />
          </div>

          {/* Logged-in User */}
          <div className="side-user">
            <div className="avatar">
              {user?.name?.slice(0, 1).toUpperCase()}
            </div>

            <div className="user-meta">
              <b>{user?.name}</b>

              <small>
                {user?.role === 'admin'
                  ? 'Administrator'
                  : 'Staff account'}
              </small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-area">

        {/* Top Header */}
        <header className="topbar">

          {/* Mobile Menu Button */}
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>

          {/* Breadcrumb */}
          <div className="crumb">
            Workspace <span>/</span> <b>Student Services</b>
          </div>

          {/* Header Actions */}
          <div className="top-actions">

            {/* System Status */}
            <span className="status-pill">
              <i />
              System operational
            </span>

            {/* Profile Dropdown */}
            <div className="profile-wrap">
              <button
                className="profile-trigger"
                onClick={() => setProfile(!profile)}
              >
                <div className="avatar small">
                  {user?.name?.slice(0, 1).toUpperCase()}
                </div>

                <span>{user?.name?.split(' ')[0]}</span>

                <ChevronDown size={15} />
              </button>

              {profile && (
                <div className="profile-menu">

                  <div className="profile-menu-head">
                    <b>{user?.name}</b>
                    <small>{user?.email}</small>
                  </div>

                  <button onClick={leave}>
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="footer">

          <span>
            © {new Date().getFullYear()} Devixo Solutions. All rights reserved.
          </span>

          <div>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <a href="mailto:hello@devixo.example">
              Contact
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
```
