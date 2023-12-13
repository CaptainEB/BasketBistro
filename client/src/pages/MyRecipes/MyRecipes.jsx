import AddRecipe from './AddRecipe';
import './MyRecipes.scss';
import ShowRecipes from './ShowRecipes';

export default function MyRecipes() {
	return (
		<section>
			<div className="my-recipes-top">
				<h1>My Recipes</h1>
				<AddRecipe />
			</div>
			<ShowRecipes />
		</section>
	);
}
