import React from 'react';
import { Icon } from '@chakra-ui/react';
import { MdOutlineInventory2, MdOutlineTableChart, MdLock, MdSpaceDashboard } from 'react-icons/md';
import { BiHomeAlt2, BiUser } from 'react-icons/bi'

// Admin Imports
import DashboardsDefault from 'views/admin/dashboards/default';
import RTL from 'views/admin/dashboards/rtl';

// Inventory Imports
import MedicinesList from 'views/admin/inventory//MedicinesList';
import NewMedicine from 'views/admin/main/ecommerce/newProduct';
import MedicineSettings from 'views/admin/main/ecommerce/settingsProduct';
import MedicinePage from 'views/admin/main/ecommerce/pageProduct';

// Reports Imports
import SalesReport from 'views/admin/reports/salesReport';
import PaymentsReport from 'views/admin/reports/paymentsReport';

// Account Reports
import ProfileSettings from 'views/admin/profile/settings';

import StocksList from 'views/admin/main/stock';
import StockSettings from 'views/admin/main/stock/settings'
import NewStock from 'views/admin/main/stock/new';
import CompanyList from 'views/admin/main/vendors';
import CompanySettings from 'views/admin/main/vendors/settings';
import NewCompany from 'views/admin/main/vendors/new';

// Auth Imports
import SignInAdmin from 'views/auth/signInAdmin';
import SignUp from 'views/auth/signUp';
import ForgotPassword from 'views/auth/forgotPassword';
import Application from 'views/admin/main/account/application';
import UsersOverview from 'views/admin/main/users/overview';
import NewUser from 'views/admin/main/users/newUser';
import UserReports from 'views/admin/main/users/reports';
import Orders from 'views/admin/main/orders';
import NewOrder from 'views/admin/main/orders/newOrder';
import OrderDetails from 'views/admin/main/orders/details';
const routes = [
	// --- Dashboards ---
	{
		name: 'Home',
		path: '/dashboards',
		icon: <Icon as={BiHomeAlt2} width='20px' height='20px' color='inherit' />,
		collapse: true,
		items: [
			{
				name: 'Dashboard',
				layout: '/admin',
				path: '/dashboards/default',
				component: DashboardsDefault
			},
			{
				name: 'RTL',
				layout: '/rtl',
				path: '/dashboards/rtl',
				component: RTL
			},
		]
	},
	// --- Inventory ---
	{
		name: 'Inventory',
		path: '/inventory',
		icon: <Icon as={MdOutlineInventory2} width='20px' height='20px' color='inherit' />,
		secondary: true,
		collapse: true,
		items: [
			{
				name: 'Medicines',
				path: '/inventory/medicines',
				exact: true,
				activePaths: ['/inventory/medicines/new'],
				layout: '/admin',
				component: MedicinesList
			},
			{
				name: 'Add Medicine',
				hideInSidebar: true,
				layout: '/admin',
				path: '/inventory/medicines/new',
				exact: false,
				component: NewMedicine
			},
			{
				layout: '/admin',
				path: '/inventory/medicines/:medId/edit',
				component: MedicineSettings
			},
			{
				layout: '/admin',
				path:'/inventory/medicines/:medId',
				component: MedicinePage
			}
		]
			
	},
	// --- Reports ---
	{
		name: 'Reports',
		path: '/reports',
		icon: <Icon as={MdOutlineTableChart} width='20px' height='20px' color='inherit' />,
		collapse: true,
		isAdmin: true,
		items: [
			{
						name: 'Sales Report',
						layout: '/admin',
						path: '/reports/sales-reports',
						component: SalesReport,
						exact: false
					},
					{
						name: 'Payments Report',
						layout: '/admin',
						path: '/reports/payments-reports',
						component: PaymentsReport,
						exact: false
					},
		]	
	},
	// ---  Account ---
	{
		name: 'Account',
		hideInSidebar: true,
		path: '/account',
		icon: <Icon as={BiUser} width='20px' height='20px' color='inherit' />,
		layout: '/admin',
		component: ProfileSettings
	},
	{
		name: 'Main',
		path: '/main',
		icon: <Icon as={MdSpaceDashboard} width='20px' height='20px' color='inherit' />,
		collapse: true,
		items: [
			{
				name: 'Stocks',
				path: '/main/stocks',
				exact: true,
				activePaths: ['/main/stocks/new'],
				component: StocksList,
				layout: '/admin',
			},
			{
				name: 'Add Stock',
				hideInSidebar: true,
				path: '/main/stocks/new',
				layout: '/admin',
				component: NewStock
			},
			{
				name: 'Companies',
				path: '/main/companies',
				exact: true,
				activePaths: ['/main/companies/new'],
				component: CompanyList,
				layout: '/admin'
			},
			{
				name: 'Add Company',
				hideInSidebar: true,
				path: '/main/companies/new',
				layout: '/admin',
				component: NewCompany
			},
			{
				name: 'Orders',
				path: '/main/orders',
				exact: true,
				activePaths: ['/main/orders/new'],
				component: Orders,
				layout: '/admin'
			},
			{
				name: 'Add Order',
				hideInSidebar: true,
				path: '/main/orders/new',
				component: NewOrder,
				layout: '/admin'
			},
			{
				name: 'Order Details',
				hideInSidebar: true,
				path: '/main/orders/view',
				component: OrderDetails,
				layout: '/admin'
			},
			{
				name: 'Users',
				path: '/main/users',
				exact: true,
				activePaths: ['/main/users/new'],
				component: UsersOverview,
				layout: '/admin',
			},
			{
				name: 'Add User',
				hideInSidebar: true,
				path: '/main/users/new',
				component: NewUser,
				layout: '/admin',
			},
			{
				name: 'User Reports',
				hideInSidebar: true,
				path: '/main/users/reports',
				component: UserReports,
				layout: '/admin',
			},
			
		]
	},
	//Auth Pages
	{
		name: 'Authentication',
		hideInSidebar: true,
		path: '/auth',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		collapse: true,
		items: [
			{
				
				path: '/sign-in',
				layout: '/auth',
				component: SignInAdmin
			},
			{
				
				path: '/admin',
				layout: '/auth',
				component: SignInAdmin
			},
			{
				path: '/sign-up',
				layout: '/auth',
				component: SignUp
			},
			{
				path: '/forgot-password',
				layout: '/auth',
				component: ForgotPassword
			},
		]
	}
];

export default routes;
