/** @format */

import { Affix, Layout } from 'antd';
import HomeScreen from '../screens/Homescreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeaderComponent, SiderComponent } from '../components';

const { Content, Footer, Header, Sider } = Layout;

const MainRouter = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Affix offsetTop={0}>
					<SiderComponent />
				</Affix>
				<Layout
					style={{
						backgroundColor: 'white !important',
					}}>
					<Affix offsetTop={0}>
						<HeaderComponent />
					</Affix>
					<Content className='pt-3 container-fluid'>
						<Routes>
							<Route path='/' element={<HomeScreen />} />
							<Route>
								<Route path='/inventory' />
								<Route path='/inventory/add-product'  />
								<Route
									path='/inventory/detail/:slug'
								/>
							</Route>
							<Route path='/report' />
							<Route path='/suppliers'  />
							<Route path='/orders'  />
							<Route>
								<Route path='/categories'  />
								<Route
									path='/categories/detail/:slug'
						
								/>
							</Route>

							<Route path='/manage-store'  />
						</Routes>
					</Content>
					<Footer className='bg-white' />
				</Layout>
			</Layout>
		</BrowserRouter>
	);
};

export default MainRouter;