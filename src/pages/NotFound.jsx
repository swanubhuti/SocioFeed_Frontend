import React from 'react';
import svg from '../assets/404.svg';
import { Link } from 'react-router-dom';
import Button from './../components/common/Button';

const PageNotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-purple-50 p-4 text-center">
			<div
				className="
                w-full max-w-sm mb-8
                filter invert-[30%] sepia-[80%] saturate-[1500%] hue-rotate-[270deg] brightness-[90%] contrast-[90%]
                md:max-w-md lg:max-w-lg
            "
			>
				<img src={svg} alt="Page Not Found" className="w-full h-auto block" />
			</div>
			<Link to="/">
				<Button>Back to Home</Button>
			</Link>
		</div>
	);
};

export default PageNotFound;
