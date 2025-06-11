import React from 'react';
import { useSelector } from 'react-redux';
import { useGetSavedPostsQuery } from '../features/posts/postApi';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import Sidebar from '../layout/Sidebar';
import { Link } from 'react-router-dom';

const SavedPostsPage = () => {
    const authUser = useSelector((state) => state.auth.user);

    const { data: savedData, isLoading } = useGetSavedPostsQuery(undefined, {
        skip: !authUser,
    });

    if (isLoading) return <LoadingSpinner />;
    if (!savedData?.posts.length)
        return (
            <p className="text-center text-gray-500 mt-10 dark:text-slate-400">
                No saved posts yet.
            </p>
        );

    return (
        <div className="flex min-h-screen bg-purple-50 dark:bg-slate-900 transition-colors">
            <Sidebar />
            <main className="flex-1 pb-10 mt-2 mx-2">
                <h1 className="text-3xl font-bold text-center mt-3 text-purple-900 dark:text-white">
                    Saved Posts
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-6 sm:px-10 mt-6">
                    {savedData.posts.map((post) => (
                        <Link
                            key={post.id}
                            to={`/post/${post.id}`}
                            className="aspect-square overflow-hidden rounded block shadow"
                        >
                            <img
                                src={post.images[0]}
                                alt="saved post"
                                className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-200"
                            />
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default SavedPostsPage;
