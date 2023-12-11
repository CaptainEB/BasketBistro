import AddRecipe from './AddRecipe';
import ShowRecipes from './ShowRecipes';

export default function MyRecipes() {
	return (
		<section className="container">
			<div>
				<h1>My Recipes</h1>
				<ShowRecipes />
			</div>
			<div>
				<AddRecipe />
			</div>
		</section>
	);
}
