import Sidebar from '../layout/Sidebar';
import Feed from '../components/feed/Feed';
import RightSidebar from '../layout/RightSidebar';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Home() {

	return (
		<div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors relative">

  <div className=" flex felx-col md:block fixed top-0 left-0 h-screen z-30 bg-white dark:bg-slate-900  dark:border-slate-700  ">
    <Sidebar />
  </div>
        
			 <main className="bg-purple-50 dark:bg-slate-900 flex-1 pt-5 px-2 md:pl-64 lg:pr-52 w-full">
        <Feed />
      </main>

			<div className="hidden lg:block fixed top-0 right-0 w-72 h-full border-l border-gray-300 dark:border-slate-800 bg-purple-50 dark:bg-slate-900 z-30 overflow-y-auto">
				<RightSidebar />
			</div>
		</div>
	);
}
