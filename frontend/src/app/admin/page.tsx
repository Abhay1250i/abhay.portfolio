'use client';

import React, { useState, useEffect } from 'react';
import { Lock, LogOut, CheckCircle, Mail, Briefcase, Settings, Plus, Trash2 } from 'lucide-react';

interface Msg {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface Proj {
  _id: string;
  title: string;
  description: string;
  stack: string[];
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'messages' | 'projects' | 'skills'>('messages');
  
  // Data lists
  const [messages, setMessages] = useState<Msg[]>([]);
  const [projects, setProjects] = useState<Proj[]>([]);
  
  // Forms state
  const [newProj, setNewProj] = useState({ title: '', description: '', stack: '' });

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchAdminData(savedToken);
    }
  }, []);

  const fetchAdminData = async (jwtToken: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    try {
      const [msgRes, projRes] = await Promise.all([
        fetch(`${backendUrl}/messages`, { headers: { 'Authorization': `Bearer ${jwtToken}` } }),
        fetch(`${backendUrl}/projects`)
      ]);
      if (msgRes.ok && projRes.ok) {
        setMessages(await msgRes.json());
        setProjects(await projRes.json());
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        fetchAdminData(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      // Offline fallback login for demo purposes
      if (username === 'admin' && password === 'admin123') {
        const mockToken = 'mock_jwt_token_ani_dev';
        localStorage.setItem('token', mockToken);
        setToken(mockToken);
        setError('');
      } else {
        setError('Connection failed. Try (admin/admin123) for offline simulation.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setMessages([]);
    setProjects([]);
  };

  const handleDeleteMessage = async (id: string) => {
    if (!token) return;
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    try {
      const res = await fetch(`${backendUrl}/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMessages(messages.filter((m) => m._id !== id));
      } else {
        // Fallback for mock environment
        setMessages(messages.filter((m) => m._id !== id));
      }
    } catch (err) {
      setMessages(messages.filter((m) => m._id !== id));
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const payload = {
      title: newProj.title,
      description: newProj.description,
      stack: newProj.stack.split(',').map((s) => s.trim()),
    };

    try {
      const res = await fetch(`${backendUrl}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        setProjects([saved, ...projects]);
        setNewProj({ title: '', description: '', stack: '' });
      } else {
        // Fallback mock addition
        const mockSaved = { _id: Date.now().toString(), ...payload };
        setProjects([mockSaved, ...projects]);
        setNewProj({ title: '', description: '', stack: '' });
      }
    } catch (err) {
      const mockSaved = { _id: Date.now().toString(), ...payload };
      setProjects([mockSaved, ...projects]);
      setNewProj({ title: '', description: '', stack: '' });
    }
  };

  // RENDER LOGIN SCREEN
  if (!token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-md glass p-8 rounded-2xl border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">Admin Control Console</h1>
            <p className="text-xs text-gray-400">Please authenticate to manage portfolio data.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Username</label>
              <input
                type="text"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400">Password</label>
              <input
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 text-center font-medium">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // RENDER ADMIN DASHBOARD
  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Control Panel</h1>
          <p className="text-xs text-gray-400">Manage projects, review contact form logs, and tweak configurations.</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-xl border border-red-500/20 text-xs font-medium transition-all flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'messages' ? 'bg-blue-600 text-white' : 'glass text-gray-300 hover:bg-white/10'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Messages Received ({messages.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'projects' ? 'bg-blue-600 text-white' : 'glass text-gray-300 hover:bg-white/10'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Manage Projects ({projects.length})</span>
          </button>
        </div>

        {/* Console Viewport */}
        <div className="md:col-span-3">
          {activeTab === 'messages' && (
            <div className="glass p-6 rounded-2xl border-white/10 space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-400" />
                <span>Contact Inboxes</span>
              </h2>

              <div className="space-y-4">
                {messages.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-10">No messages found in database.</p>
                ) : (
                  messages.map((msg) => (
                    <div key={msg._id} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-bold text-white text-xs">{msg.name}</span>
                          <span className="text-[10px] text-gray-400 font-mono">({msg.email})</span>
                        </div>
                        <p className="text-xs font-medium text-blue-400">{msg.subject}</p>
                        <p className="text-xs text-gray-300 pt-1 leading-relaxed">{msg.message}</p>
                        <span className="block text-[9px] text-gray-500 font-mono pt-1">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="text-gray-400 hover:text-red-400 transition-colors p-1"
                        aria-label="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-8">
              {/* Form to Add Project */}
              <div className="glass p-6 rounded-2xl border-white/10 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-400" />
                  <span>Register New Engineering Work</span>
                </h2>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Project Title</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        placeholder="Truth Lense"
                        value={newProj.title}
                        onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Tech Stack (comma separated)</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        placeholder="Next.js, Python, Docker"
                        value={newProj.stack}
                        onChange={(e) => setNewProj({ ...newProj, stack: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Description</label>
                    <textarea
                      rows={3}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                      placeholder="High-performance media verification portal..."
                      value={newProj.description}
                      onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold"
                  >
                    Add Project
                  </button>
                </form>
              </div>

              {/* List of Projects */}
              <div className="glass p-6 rounded-2xl border-white/10 space-y-4">
                <h2 className="text-lg font-bold text-white">Existing Projects ({projects.length})</h2>
                <div className="divide-y divide-white/5">
                  {projects.map((p) => (
                    <div key={p._id} className="py-3 flex justify-between items-center gap-4">
                      <div>
                        <h4 className="font-bold text-white text-xs">{p.title}</h4>
                        <p className="text-[10px] text-gray-400 truncate max-w-md">{p.description}</p>
                      </div>
                      <span className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400 font-mono">
                        {p.stack.join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
