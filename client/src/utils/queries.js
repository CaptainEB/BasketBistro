// queries
import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
	query GetRecipes {
		getRecipes {
			name
			_id
			ingredients {
				_id
				amount
				ingredientName
			}
		}
	}
`;

export const GET_LIST = gql`
	query Query {
		getUserList {
			list {
				_id
				name
				ingredients {
					_id
					amount
					ingredientName
				}
			}
		}
	}
`;
