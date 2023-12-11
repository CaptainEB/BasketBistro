import { useQuery } from '@apollo/client';
import { GET_LIST } from '/src/utils/queries';

export default function CurrentList() {
	const { data, loading } = useQuery(GET_LIST);
	const { getUserList } = data || [];
	let combinedList = [];
	if (loading) return <p>Loading...</p>;

	for (let i = 0; i < getUserList.length; i++) {
		const currentRecipe = getUserList[i];
		currentRecipe.ingredients.forEach((ing) => {
			const existingIngredient = combinedList.find((obj) => obj.ingredientName === ing.ingredientName);

			if (existingIngredient) {
				existingIngredient.amount += ing.amount;
			} else {
				combinedList.push({ ...ing });
			}
		});
	}

	return (
		<section>
			{combinedList?.map((ingredient) => (
				<div key={ingredient.ingredientName}>
					<p>
						{ingredient.ingredientName} {ingredient.amount}
					</p>
				</div>
			))}
		</section>
	);
}
