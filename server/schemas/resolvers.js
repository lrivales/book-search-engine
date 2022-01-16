const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Book, User } = require('../models');

const resolvers = {
    Query: {
        // me query
        me: async ( parent, args, context ) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                return userData;
            }

            throw new AuthenticationError('Not logged in.');
        },

        // get single user
        getSingleUser: async (parent, { _id, username }) => {
            return User.findOne({ 
                $or: [{ _id }, { username }]
            });
        },

        // get all users
        getAllUsers: async () => {
            return User.find();
        }
    },

    Mutation: {
        // add user
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        // save book to user
        saveBook: async (parent, { _id, content }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id },
                { $addToSet: { savedBooks: content } },
                { new: true, runValidators: true }
            );
            return updatedUser;
        },

        // remove book from user
        removeBook: async (parent, { _id, bookId }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
            return updatedUser;
        },

        // authenticate user
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            
            if (!user) {
                throw new AuthenticationError('Incorrect credentials!')
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials!');
            }

            const token = signToken(user);
            return { token, user };
        }

    }
};

module.exports = resolvers;