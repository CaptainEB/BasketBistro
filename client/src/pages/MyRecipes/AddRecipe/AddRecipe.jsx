import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.scss';
import { ADD_RECIPE } from '/src/utils/mutations';

export default function AddRecipe() {
	const navigate = useNavigate();
	const [formState, setFormState] = useState({ name: '', description: '' });
	const [ingredients, setIngredients] = useState([{ ingredientName: '', amount: '' }]);
	const [addRecipe, { error }] = useMutation(ADD_RECIPE);

	if (error) return <div>{error.message}</div>;

	async function submitRecipe(formState, ingredients) {
		try {
			await addRecipe({
				variables: {
					name: formState.name,
					description: formState.description,
					ingredients: ingredients,
				},
			});
			closeDialog();
			navigate(0);
		} catch (err) {
			console.log(err);
		}
	}

	function addOneRecipe(e) {
		e.preventDefault();
		if (!formState.name || !formState.description || !ingredients) return;
		if (ingredients[ingredients.length - 1].ingredientName === '' || ingredients[ingredients.length - 1].amount === '') {
			const newIngredients = [...ingredients];
			newIngredients.pop();
			submitRecipe(formState, newIngredients);
			return;
		}
		submitRecipe(formState, ingredients);
	}

	function handleOnChange(e) {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
	}

	function handleIngredientChange(index, fieldName, value) {
		const newIngredients = [...ingredients];

		if (fieldName === 'amount') {
			if (value === '') return;

			newIngredients[index][fieldName] = parseFloat(value);
			setIngredients(() => newIngredients);
			return;
		}

		newIngredients[index][fieldName] = value;
		setIngredients(() => newIngredients);
	}

	function handleIngredientSubmit(e) {
		e.preventDefault();
		setIngredients([...ingredients, { ingredientName: '', amount: '' }]);
	}

	function openDialog() {
		document.getElementById('recipeDialog').showModal();
	}

	function closeDialog() {
		document.getElementById('recipeDialog').close();
	}

	return (
		<div className="add-recipe-container">
			<button className="add-recipe" onClick={openDialog}>
				Add Recipe
			</button>
			<dialog id="recipeDialog" className="add-recipe-dialog">
				<div className="dialog-content">
					<form className="recipe-info">
						<div>
							<label htmlFor="name">Recipe Name</label>
							<input value={formState.name} onChange={handleOnChange} name="name" type="text" id="name" />
						</div>

						<div className="description">
							<label htmlFor="description">Recipe Description</label>
							<input value={formState.description} onChange={handleOnChange} name="description" id="description" />
						</div>

						<button type="submit" onClick={addOneRecipe}>
							Add
						</button>
					</form>
					<form className="recipe-ingredients">
						{ingredients.map((ingredient, index) => (
							<div key={index}>
								<input
									type="text"
									placeholder="Ingredient name"
									value={ingredient.ingredientName}
									onChange={(e) => handleIngredientChange(index, 'ingredientName', e.target.value)}
								/>
								<input
									type="text"
									placeholder="Amount"
									value={ingredient.amount}
									onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
								/>
							</div>
						))}
						<button type="submit" onClick={(e) => handleIngredientSubmit(e)}>
							Add ingredient
						</button>
					</form>
				</div>
			</dialog>
		</div>
	);
}
