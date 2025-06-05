import Sidebar from '../layout/Sidebar';
import Feed from '../components/feed/Feed';
import RightSidebar from '../layout/RightSidebar';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors relative">

      {/* Mobile Sidebar and Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-white dark:bg-slate-900 border-r dark:border-slate-700 shadow-md transition-transform duration-300 transform md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar setOpen={setOpen} />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r dark:border-slate-700 z-30 shadow-md">
        <Sidebar />
      </aside>

      {/* Hamburger Button (Mobile only) */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-3 left-3 z-[999] bg-purple-700 text-white p-2 rounded-md shadow"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Feed */}
      <main className="flex-1 pt-5 px-2 md:pl-64 lg:pr-80 w-full">
        <Feed />
      </main>

      {/* Right Sidebar */}
      <div className="hidden lg:block fixed top-0 right-0 w-72 h-full border-l border-gray-300 dark:border-slate-800 bg-purple-50 dark:bg-slate-900 z-30 overflow-y-auto">
        <RightSidebar />
      </div>
    </div>
  );
}
