const { AuthenticationError } = require('apollo-server-express');
// only import User. Book.js is a subschema, so not its own model 
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
                .populate('books')
            }
            throw new AuthenticationError('You must be logged in!');
        },
    },
    // reference user-controller.js to understand what to pass in
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email');
            }

            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password});

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context ) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args }},
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Must be logged in!');
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId }}},
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Must be logged in!');
        },
    },

};

module.exports = resolvers;