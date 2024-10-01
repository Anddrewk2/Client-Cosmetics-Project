/** @format */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  Login  from '../screens/auth/Login';
import  SignUp  from '../screens/auth/Signup';

import { Typography } from 'antd';

const { Title } = Typography;

const AuthRouter = () => {
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div
					className='col d-none d-lg-block text-center'
					style={{ marginTop: '15%' }}>
					<div className='mb-4'>
						<img
							style={{
								width: 256,
								objectFit: 'cover',
							}}
							src='https://firebasestorage.googleapis.com/v0/b/project-8592240410215207885.appspot.com/o/DH-Hoa-Sen-Main-Icon.png?alt=media&token=22e62305-6796-4db1-b63e-543fe8a001cd'
							alt=''
						/>
					</div>
					<div>
						<Title className='text-primary'>Cosmetics Beauty</Title>
					</div>
				</div>

				<div className='col content-center'>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Login />} />
							<Route path='/sign-up' element={<SignUp />} />
						</Routes>
					</BrowserRouter>
				</div>
			</div>
		</div>
	);
};

export default AuthRouter;