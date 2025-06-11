import CreatePost from '../components/post/CreatePost';
import Sidebar from '../layout/Sidebar';

const CreatePostPage = () => {
  return (
    <div className="flex min-h-screen bg-purple-50 dark:bg-slate-900 transition-colors">
      <Sidebar />
      
      <main className="flex-1 p-4 sm:p-6 max-w-screen-md lg:max-w-2xl mx-auto w-full">
        <CreatePost />
      </main>
    </div>
  );
};

export default CreatePostPage;
