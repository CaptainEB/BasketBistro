import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '/src/utils/queries';

export default function ShowRecipes() {
	const { data, loading } = useQuery(GET_RECIPES);
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
					</div>
				);
			})}
		</section>
	);
}
