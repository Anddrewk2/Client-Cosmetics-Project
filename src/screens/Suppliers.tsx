/** @format */
import React, { useEffect, useState } from 'react';
import { Avatar, Button, message, Space, Table, Typography } from 'antd';
import {ColumnProps} from 'antd/es/table';
import { Filter, Sort } from 'iconsax-react';
import {colors} from '../constants/Colors'
import { ToogleSupplier } from '../modals';
import { SupplierModel } from '../models/SupplierModel';
import handleAPI from '../apis/handleAPI';
const {Title,Text} = Typography;

const Suppliers = () => {
	const [isVisibleModalAddNew,SetIsvisibleModalAddNew] = useState(false);
	const [suppliers,setSuppliers] = useState<SupplierModel[]>([]);
	const [isLoading,setIsLoading] = useState(false);


	const columns: ColumnProps<SupplierModel>[] = [
		{
			key: 'name',
			dataIndex:'name',
			title:'Supplier name',
		},
		{
			key: 'product',
			dataIndex:'product',
			title:'Product',
		},
		{
			key: 'contact',
			dataIndex:'contact',
			title:'Contact',
		},
		{
			key: 'email',
			dataIndex:'email',
			title:'Email',
		},
		{
			key: 'Type',
			dataIndex:'isTaking',
			title:'Type',
			render:(isTaking:boolean) => (
			<Text type={isTaking ? 'success':'danger'} >{isTaking ?'Taking Return':'Not Talking Return' }</Text>)
		},
		


	];

	useEffect(() => {
		getSuppliers();
	},[])
	const getSuppliers = async () => {
		const api = '/supplier';
		setIsLoading(true);
		try {
			const res = await handleAPI(api);

			res.data && setSuppliers(res.data);
		} catch (error:any) {
			message.error(error.message)
			
		}finally{
			setIsLoading(false)
		}
	
	
	}
		return (
		<div>

		<Table loading={isLoading}
		dataSource={suppliers} 
		columns={columns}
		 title={() =>(
			<div className='row'>
				<div className='col'>
					<Title level={5}>Suppliers</Title>
				</div>
				<div className='col text-right'>
					<Space>
						<Button type='primary' onClick={()=>SetIsvisibleModalAddNew(true)}>Add Supplier</Button>
						<Button icon={<Sort size= {20} color={colors.gray600}/>}>
						Filters
						</Button>
						<Button>Download all</Button>
					</Space>
				</div>
			</div>	
		 )} />


		 <ToogleSupplier visible={isVisibleModalAddNew} onClose={() => SetIsvisibleModalAddNew(false)} 
		 onAddNew={val => setSuppliers([...suppliers,val ])}
		 />
		</div>
			
	);
};

export default Suppliers;