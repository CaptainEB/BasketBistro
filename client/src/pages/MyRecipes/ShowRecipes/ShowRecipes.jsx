import { useMutation, useQuery } from '@apollo/client';
import './ShowRecipes.scss';
import { UPDATE_LIST } from '/src/utils/mutations';
import { GET_USER_RECIPES } from '/src/utils/queries';

export default function ShowRecipes() {
	const { data, loading } = useQuery(GET_USER_RECIPES);
	const [addRecipeToList] = useMutation(UPDATE_LIST);

	async function addToList(e, recipe) {
		try {
			await addRecipeToList({
				variables: {
					recipeId: recipe._id,
				},
			});
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<section className="container">
			{data?.getUserRecipes?.map((recipe) => {
				return (
					<div key={recipe._id} className="recipe-card">
						{recipe?.image ? (
							<img className="recipe-image" src={recipe?.image} alt={recipe.name} height={200} width={200} />
						) : (
							<div className="recipe-image" />
						)}
						<div className="recipe-info">
							<h2 className="recipe-name">{recipe.name}</h2>
						</div>
						<div className="add-recipe-btn">
							<button
								onClick={(e) => {
									addToList(e, recipe);
								}}
							>
								+
							</button>
						</div>
					</div>
				);
			})}
		</section>
	);
}
