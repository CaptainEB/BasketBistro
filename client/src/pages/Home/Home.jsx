import { useMutation, useQuery } from '@apollo/client';
import './home.scss';
import Auth from '/src/utils/auth';
import { ADD_TO_MY_RECIPES } from '/src/utils/mutations';
import { GET_RECIPES } from '/src/utils/queries';

export default function Home() {
	const { data, loading } = useQuery(GET_RECIPES);
	const [addRecipe, { error }] = useMutation(ADD_TO_MY_RECIPES);
	if (loading) return <div>Loading...</div>;
	const loggedIn = Auth.loggedIn();

	async function addToMyRecipes(recipe) {
		try {
			await addRecipe({
				variables: {
					recipeId: recipe._id,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<section className="container">
			{data?.getRecipes?.map((recipe) => {
				return (
					<div key={recipe._id} className="card">
						{recipe?.image ? (
							<img className="recipe-image" src={recipe?.image} alt={recipe.name} height={200} width={200} />
						) : (
							<div className="recipe-image" />
						)}
						<div className="home-recipe-info">
							<div className="recipe-name-and-desc">
								<h2 className="recipe-name">{recipe.name}</h2>
								<p className="recipe-description">{recipe?.description}</p>
							</div>
							{loggedIn && (
								<button
									className="add-to-my-recipes-btn"
									onClick={(e) => {
										addToMyRecipes(recipe);
									}}
								>
									+
								</button>
							)}
						</div>
					</div>
				);
			})}
		</section>
	);
}
