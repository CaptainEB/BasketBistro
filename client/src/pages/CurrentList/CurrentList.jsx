import { useQuery } from '@apollo/client';
import { GET_LIST } from '/src/utils/queries';

export default function CurrentList() {
	const { data, loading } = useQuery(GET_LIST);
	return (
		<>
			{data?.getList?.map((listItem) => {
				return (
					<div key={listItem._id}>
						<div>
							{listItem.ingredients.map((ingredient) => {
								return (
									<div key={ingredient._id}>
										<span>{ingredient.ingredientName}</span>
										<span>{ingredient.amount}</span>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</>
	);
}
