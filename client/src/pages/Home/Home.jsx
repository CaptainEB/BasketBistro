import { useQuery } from '@apollo/client';
import './home.scss';
import { GET_RECIPES } from '/src/utils/queries';

export default function Home() {
	const { data, loading } = useQuery(GET_RECIPES);
	if (loading) return <div>Loading...</div>;
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
						<h2 className="recipe-name">{recipe.name}</h2>
						<p className="recipe-description">{recipe?.description}</p>
					</div>
				);
			})}
		</section>
	);
}
