import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login,LandingPage } from 'components';

function PublicRoutes() {
	return (
		<Fragment>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="">
					<Login />
				</Route>
			</Switch>
		</Fragment>
	)
}

export default PublicRoutes;
