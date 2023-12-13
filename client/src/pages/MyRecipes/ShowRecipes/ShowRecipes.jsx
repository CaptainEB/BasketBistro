import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './ShowRecipes.scss';
import { DELETE_RECIPE, UPDATE_LIST } from '/src/utils/mutations';
import { GET_USER_RECIPES } from '/src/utils/queries';

export default function ShowRecipes() {
	const { data, loading } = useQuery(GET_USER_RECIPES);
	const [addRecipeToList] = useMutation(UPDATE_LIST);
	const [deleteRecipe] = useMutation(DELETE_RECIPE);
	const navigate = useNavigate();

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

	async function removeRecipe(e, recipe) {
		try {
			await deleteRecipe({
				variables: {
					recipeId: recipe._id,
				},
			});
			navigate(0);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<section className="container">
			{data?.getUserRecipes?.map((recipe, i) => {
				return (
					<div key={i} className="recipe-card">
						{recipe?.image ? (
							<img className="recipe-image" src={recipe?.image} alt={recipe.name} height={200} width={200} />
						) : (
							<div className="recipe-image" />
						)}
						<div className="recipe-info">
							<h2 className="recipe-name">{recipe.name}</h2>
						</div>
						<div className="recipe-btns">
							<button
								onClick={(e) => {
									removeRecipe(e, recipe);
								}}
							>
								-
							</button>
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
