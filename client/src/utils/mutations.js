// mutations
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation Mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				username
				_id
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
				email
			}
		}
	}
`;

export const ADD_RECIPE = gql`
	mutation Mutation($name: String!, $ingredients: [IngredientInput]!, $description: String) {
		addRecipe(name: $name, ingredients: $ingredients, description: $description) {
			_id
			name
		}
	}
`;

export const UPDATE_LIST = gql`
	mutation Mutation($recipeId: ID!) {
		updateList(recipeId: $recipeId) {
			name
			ingredients {
				_id
				amount
				ingredientName
			}
			_id
		}
	}
`;

export const CLEAR_LIST = gql`
	mutation Mutation {
		clearList
	}
`;
