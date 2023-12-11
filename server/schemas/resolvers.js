const { User, Recipe } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				return User.findOne({ _id: context.user._id });
			}
			throw AuthenticationError;
		},
		getUser: async (parent, { id }) => {
			return await User.findById(id);
		},
		getUsers: async () => {
			return await User.find();
		},
		getRecipe: async (parent, { id }) => {
			return await Recipe.findById(id);
		},
		getRecipes: async () => {
			return await Recipe.find();
		},
		getUserList: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate('list');
				console.log(user.list);
				return user.list;
			}
		},
	},

	Mutation: {
		addUser: async (parent, { username, email, password }) => {
			const user = new User({ username, email, password });
			await user.save();
			const token = signToken(user);
			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw AuthenticationError;
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw AuthenticationError;
			}

			const token = signToken(user);

			return { token, user };
		},
		updateUser: async (parent, args, context) => {
			if (!context.user) {
				throw new AuthenticationError('You are not authenticated');
			}
			const user = await User.findByIdAndUpdate(context.user._id, args, { new: true });
			return user;
		},

		deleteUser: async (parent, { id }, context) => {
			if (!context.user) {
				throw AuthenticationError;
			}
			const user = await User.findByIdAndRemove(id);
			return user;
		},
		addRecipe: async (parent, { name, description, image, ingredients }, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id);
				const newRecipe = new Recipe({ name, description, image, ingredients });
				await newRecipe.save();
				user.recipe.push(newRecipe);
				await user.save();
				return newRecipe;
			}
		},
		updateList: async (parent, { recipeId }, context) => {
			if (context.user) {
				try {
					const user = await User.findById(context.user._id);
					const recipe = await Recipe.findById(recipeId);

					if (!recipe) {
						throw new Error('Recipe not found');
					}

					user.list.push(recipe);
					await user.save();
					return recipe;
				} catch (error) {
					console.error(error);
				}
			} else {
				throw AuthenticationError;
			}
		},
	},
};
// User: {
//   recipe: async (parent) => {
//     return await Recipe.find({ _id: { $in: parent.recipe } });
//   },
//   list: async (parent) => {
//     return await List.find({ _id: { $in: parent.list } });
//   },
// },
// };

module.exports = resolvers;
