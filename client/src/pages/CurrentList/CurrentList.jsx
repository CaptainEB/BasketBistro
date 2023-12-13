import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './CurrentList.scss';
import { CLEAR_LIST } from '/src/utils/mutations';
import { GET_LIST } from '/src/utils/queries';

function countRecipeOccurrences(recipes) {
	const uniqueRecipes = [];

	recipes.forEach((recipe) => {
		const { _id, name, image } = recipe;

		const existingRecipeIndex = uniqueRecipes.findIndex((item) => item.name === name);

		if (existingRecipeIndex !== -1) {
			uniqueRecipes[existingRecipeIndex].count++;
			return;
		}

		uniqueRecipes.push({ _id, name, image, count: 1 });
	});

	return uniqueRecipes;
}

export default function CurrentList() {
	const { data, loading } = useQuery(GET_LIST);
	const [clearList] = useMutation(CLEAR_LIST);
	const { getUserList } = data || [];
	const navigate = useNavigate();

	let combinedList = [];
	if (loading) return <p>Loading...</p>;

	function handleClearList() {
		clearList();
		navigate(0);
	}

	//combines recipes into one list of ingredients
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

	if (!loading) {
		const uniqueRecipes = countRecipeOccurrences(getUserList);

		return (
			<section>
				<button className="clear-btn" onClick={handleClearList}>
					Clear List
				</button>
				<section className="list-container">
					<div className="recipes-names">
						{uniqueRecipes?.map((recipe) => (
							<div key={recipe._id}>
								{recipe?.image ? (
									<img className="recipe-image" src={recipe?.image} alt={recipe.name} height={200} width={200} />
								) : (
									<div className="recipe-image" />
								)}
								<div className="recipe-info">
									<h2>
										{recipe.name} X{recipe.count}
									</h2>
								</div>
							</div>
						))}
					</div>
					<div className="shopping-list">
						<ul className="shopping-ul">
							{combinedList?.map((ingredient) => (
								<li key={ingredient.ingredientName}>
									{ingredient.amount} {ingredient.ingredientName}
								</li>
							))}
						</ul>
					</div>
				</section>
			</section>
		);
	}
}
