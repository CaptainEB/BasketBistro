const { User, Recipe, List } = require('../models');
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
		getList: async (parent, { id }) => {
			return await List.findById(id);
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
				const newRecipe = new Recipe({ name, description, image, ingredients });
				await newRecipe.save();
				return newRecipe;
			}
		},

		addList: async (parent, args) => {
			const newList = new List(args);
			return await newList.save();
		},
	},
	// User: {
	//   recipe: async (parent) => {
	//     return await Recipe.find({ _id: { $in: parent.recipe } });
	//   },
	//   list: async (parent) => {
	//     return await List.find({ _id: { $in: parent.list } });
	//   },
	// },
};

module.exports = resolvers;
