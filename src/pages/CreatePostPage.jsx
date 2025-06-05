import CreatePost from '../components/post/CreatePost';
import Sidebar from '../layout/Sidebar';

const CreatePostPage = () => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <Sidebar />
      <main className="flex-1 p-6 max-w-2xl mx-auto">
        <CreatePost />
      </main>
    </div>
  );
};

export default CreatePostPage;
