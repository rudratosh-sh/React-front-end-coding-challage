import { Roles } from 'config'

// Components
import {
	Dashboard,
} from 'components';


export default [

	{
		component: Dashboard,
		path: '/dashboard',
		title: 'Dashboard',
		permission: [
			Roles.SUPER_ADMIN,
			Roles.CUSTOMER
		],
	},
]
