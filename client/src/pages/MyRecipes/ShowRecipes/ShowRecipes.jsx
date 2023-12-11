import { useMutation, useQuery } from '@apollo/client';
import { ADD_LIST } from '/src/utils/mutations';
import { GET_RECIPES } from '/src/utils/queries';

export default function ShowRecipes() {
	const { data, loading } = useQuery(GET_RECIPES);
	const [addRecipeToList] = useMutation(ADD_LIST);

	async function addToList(e, recipe) {
		await addRecipeToList({
			variables: {
				recipes: recipe._id,
			},
		});
	}

	return (
		<section>
			{data?.getRecipes?.map((recipe) => {
				return (
					<div key={recipe._id}>
						<h2>{recipe.name}</h2>
						<p>{recipe?.description}</p>
						<div>
							{recipe.ingredients.map((ingredient) => {
								return (
									<div key={ingredient._id}>
										<span>{ingredient.ingredientName}</span>
										<span>{ingredient.amount}</span>
									</div>
								);
							})}
						</div>
						<button
							onClick={(e) => {
								addToList(e, recipe);
							}}
						>
							Add to List
						</button>
					</div>
				);
			})}
		</section>
	);
}
