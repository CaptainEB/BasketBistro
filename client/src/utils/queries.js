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
	query Query($getListId: ID!) {
		getList(id: $getListId) {
			recipes {
				ingredients {
					ingredientName
					amount
					_id
				}
				_id
			}
			_id
		}
	}
`;
