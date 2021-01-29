import React, { memo } from 'react';
import { TopNav } from './common';

const navOptions = [
	{title: 'Login', path: '/login'}
];

function LandingPage() {
	return (
		<div className="bgimg w3-display-container w3-animate-opacity w3-text-white">
			<TopNav routes={navOptions}/>
		</div>
	)
}

export default memo(LandingPage);
