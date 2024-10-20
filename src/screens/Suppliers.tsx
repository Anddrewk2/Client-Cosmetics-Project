/** @format */
import React, { useEffect, useState } from 'react';
import { Avatar, Button, message, Space, Table, Tooltip, Typography } from 'antd';
import {ColumnProps, TableProps} from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';
import { MdLibraryAdd } from 'react-icons/md';

import {  Edit2, Sort,Trash } from 'iconsax-react';
import {colors} from '../constants/Colors'
import { ToogleSupplier } from '../modals';
import { SupplierModel } from '../models/SupplierModel';
import handleAPI from '../apis/handleAPI';
import confirm from 'antd/es/modal/confirm';
const {Title,Text} = Typography;

type TableRowSelection<T extends object = object> =
	TableProps<T>['rowSelection'];
const Suppliers = () => {
	const [isVisibleModalAddNew,SetIsvisibleModalAddNew] = useState(false);
	const [suppliers,setSuppliers] = useState<SupplierModel[]>([]);
	const [isLoading,setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [supplierSelected, setSupplierSelected] = useState<SupplierModel>();

	const [searchKey, setSearchKey] = useState('');
	const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

	const [total, setTotal] = useState<number>(10);
	const [pageSize, setPageSize] = useState(10);

	const navigate = useNavigate();

	useEffect(() => {
		if (!searchKey) {
			setPage(1);
			getSuppliers(`/supplier?page=${page}&pageSize=${pageSize}`);
		}
	}, [searchKey]);
	useEffect(() => {
		getSuppliers(`/supplier?page=${page}&pageSize=${pageSize}`);
	}, [page, pageSize]);
	// useEffect(() => {
	// 	getSuppliers(`/supplier?page=${page}&pageSize=${pageSize}`);
	// },[])
	const getSuppliers = async (api: string) => {
		setIsLoading(true);
		try {
			const res = await handleAPI(api);
			const data = res.data;
			setSuppliers(data.items.map((item: any) => ({ ...item, key: item._id })));

			setTotal(data.totalItems);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	
	const hanleRemoveSupplier = async (id: string) => {
		const api = `/supplier/remove?id=${id}`;
		try {
			await handleAPI(api, undefined, 'delete');

			// cach 1: gọi lại api để load lại dữ liệu

			// Cách 2: xoá item ra khỏi mảng, set lại state
			const items = [...suppliers];
			const index = items.findIndex((element) => element._id === id);

			if (index !== -1) {
				items.splice(index, 1);
			}

			setSuppliers(items);

			message.success('Supplier removed!!!');
		} catch (error: any) {
			message.error(error.message);
		}
	};
	const onSelectChange = (newSelectRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectRowKeys);
	};
	const rowSelection: TableRowSelection<SupplierModel> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const columns: ColumnProps<SupplierModel>[] = [
		{
			 key: 'name',
			 dataIndex:'name',
			 title:'Supplier name',
			 render: (name: string) => (
				<Tooltip style={{ width: 320 }} title={name}>
					<div className='text-2-line'>{name}</div>
				</Tooltip>
			),
		},
		{
			key: 'product',
			dataIndex:'product',
			title:'Product',
			render: (product: string) => (
				<Tooltip style={{ width: 320 }} title={product}>
					<div className='text-2-line'>{product}</div>
				</Tooltip>
			),
		},
		{
			key: 'contact',
			dataIndex:'contact',
			title:'Contact Number',
			render: (contact: string) => (
				<Tooltip style={{ width: 320 }} title={contact}>
					<div className='text-2-line'>{contact}</div>
				</Tooltip>
			),
		},
		{
			key: 'email',
			dataIndex:'email',
			title:'Email',
			// render: (email: string) => (
			// 	<Tooltip style={{ width: 320 }} title={email}>
			// 		<div className='text-2-line'>{email}</div>
			// 	</Tooltip>
			// ),
		},
		{
			key: 'Type',
			dataIndex:'isTaking',
			title:'Talking',
			render:(isTaking:boolean) => (
			<Text type={isTaking ? 'success':'danger'} >{isTaking ?'Taking Return':'Not Talking Return' }</Text>)
		},
		{
			key: 'actions',
			title: 'Actions',
			dataIndex: '',
			fixed: 'right',
			width: 150,
			render: (item: SupplierModel) => (
				<Space>
					
					{/* <Tooltip title='Edit supplier' key={'btnEdit'}>
						<Button
							icon={<Edit2 color={colors.primary500} size={20} />}
							type='text'
							onClick={()=>SetIsvisibleModalAddNew('`/supplier/add-new?id=${item._id}')}
							// onClick={() => navigate(`/supplier/add-new?id=${item._id}`)}
						/>
					</Tooltip> */}
					<Tooltip title='Delete product' key={'btnDelete'}>
						<Button
							icon={<Trash className='text-danger' size={20} />}
							type='text'
							onClick={() =>
								confirm({
									title: 'Confirm?',
									content: 'Are you sure you want to delete this item?',
									onCancel: () => console.log('cancel'),
									onOk: () => hanleRemoveSupplier(item._id),
								})
							}
						/>
					</Tooltip>
				</Space>
			),
			align: 'right',
		},
		

	];

	
	


	
		return (
		<div >
		 {/* <Table loading={isLoading}
		dataSource={suppliers} 
		columns={columns}
		 title={() =>( '')} />   */}
		
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
		<Table
				pagination={{
					showSizeChanger: true,
					onShowSizeChange: (current, size) => {
						// console.log(current, size);
						// console.log('size');
					},
					total,
					onChange(page, pageSize) {
						setPage(page);
						setPageSize(pageSize);
					},
					showQuickJumper: false,
				}}
				rowSelection={rowSelection}
				dataSource={suppliers}
				columns={columns}
				loading={isLoading}
				scroll={{
					x: '100%',
				}}
				bordered
				size='small'
			/>
		</div>	
	
		
			

		 <ToogleSupplier visible={isVisibleModalAddNew} onClose={() => SetIsvisibleModalAddNew(false)} 
		 onAddNew={val => setSuppliers([...suppliers,val ])}
		 />
		</div>
		
			
	);
};

export default Suppliers;