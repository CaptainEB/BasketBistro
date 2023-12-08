const { User, Recipe, List } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getUser: async (parent, { id }) => {
      return await User.findById(id);
    },
    getRecipe: async (parent, { id }) => {
      return await Recipe.findById(id);
    },
    getList: async (parent, { id }) => {
      return await List.findById(id);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },


  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = new User({ username, email, password });
      const token = signToken(user);
      return { token, user };;
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
    updateUser: async (parent, args) => {
      return await User.findByIdAndUpdate(args.id, args, { new: true });
    },
    deleteUser: async (parent, { id }) => {
      return await User.findByIdAndRemove(id);
    },
    addRecipe: async (parent, { name, description, image, ingredients }) => {
      const newRecipe = new Recipe({ name, description, image, ingredients });
      return await newRecipe.save();
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