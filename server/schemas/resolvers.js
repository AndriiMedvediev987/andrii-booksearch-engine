const { Book, User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }

      const correctPwd = await user.isCorrectPassword(password);

      if (!correctPwd) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, {input, userID}) => {
      return User.findOneAndUpdate(
        { _id: userID },
        { $addToSet: { savedBooks: input } },
        { new: true }
      );

    },

    removeBook: async (parent, { userID, bookID }) => {
      return User.findOneAndUpdate(
        { _id: userID },
        { $pull: { savedBooks: {bookID: bookID} } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
