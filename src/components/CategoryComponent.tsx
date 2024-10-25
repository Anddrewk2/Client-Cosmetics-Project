/** @format */

import React, { useEffect, useState } from 'react';
import { CategoyModel } from '../models/CategoriesModel';
import handleAPI from '../apis/handleAPI';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { listColors } from '../constants/Colors';

interface Props {
	id: string;
}

const CategoryComponent = (props: Props) => {
	const { id } = props;

	const [category, setCategory] = useState<CategoyModel>();

	useEffect(() => {
		getCategoryDetail();
	}, [id]);

	const getCategoryDetail = async () => {
		const api = `/categories/categories/detail?id=${id}`;

		try {
			const res = await handleAPI(api);

			res.data && setCategory(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Link to={`/categories/detail/${category?.slug}?id=${id}`}>
			<Tag color={listColors[Math.floor(Math.random() * listColors.length)]}>
				{category?.title}
			</Tag>
		</Link>
	);
};

export default CategoryComponent;