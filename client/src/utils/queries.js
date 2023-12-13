// queries
import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
	query Query {
		getRecipes {
			_id
			description
			image
			ingredients {
				_id
				amount
				ingredientName
			}
			name
		}
	}
`;

export const GET_LIST = gql`
	query Query {
		getUserList {
			name
			ingredients {
				ingredientName
				amount
				_id
			}
			_id
		}
	}
`;

export const GET_USER_RECIPES = gql`
	query Query {
		getUserRecipes {
			_id
			image
			name
		}
	}
`;

export const GET_ME = gql`
	query Query {
		me {
			email
			_id
			username
		}
	}
`;
