import { createContext, useState } from 'react';

const RecipeListContext = createContext();

export function RecipeListProvider(props) {
	const [recipeList, setRecipeList] = useState([]);

	function addToRecipeList(newItem) {
		setRecipeList((prevRecipeList) => {
			return [...prevRecipeList, newItem];
		});
	}

	function clearRecipeList() {
		setRecipeList([]);
	}

	return <RecipeListContext.Provider value={{ recipeList, addToRecipeList, clearRecipeList }}>{props.children}</RecipeListContext.Provider>;
}

export default RecipeListContext;
