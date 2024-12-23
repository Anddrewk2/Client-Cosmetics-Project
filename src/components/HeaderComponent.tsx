/** @format */

import { Avatar, Button, Dropdown, Input, MenuProps, Space } from 'antd';
import { Notification, SearchNormal1 } from 'iconsax-react';
import { colors } from '../constants/Colors';
import { auth } from '../firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { authSeletor, removeAuth } from '../reduxs/reducers/AuthReducer';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const HeaderComponent = () => {
	const user = useSelector(authSeletor);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const items: MenuProps['items'] = [
		{
			key: 'logout',
			label: 'Đăng xuất',
			onClick: async () => {
				signOut(auth);
				dispatch(removeAuth({}));
				localStorage.clear();
				navigate('/');
			},
		},
	];

	return (
<div className='p-2 row bg-white m-0 justify-content-end' style={{ display: 'flex' }}> 
  <div className='col'>
    <Input
      placeholder='Search Everything'
      style={{
        borderRadius: 100,
        width: '50%',
      }}
      size='large'
      prefix={<SearchNormal1 className='text-muted' size={20} />}
    />
  </div>
  <div className='col' 
  style={{
        textAlign: 'right',
        width: '50%',
      }}>
    <Space>
      <Button
        type='text'
        icon={<Notification size={22} color={colors.gray600} />}

      />
      <Dropdown menu={{ items }}>
        <Avatar src={user.photoUrl} size={40} />
      </Dropdown>
    </Space>
  </div>
</div>
	);
};

export default HeaderComponent;
