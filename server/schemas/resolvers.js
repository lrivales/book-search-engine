const { Book, User } = require('../models');

const resolvers = {
    Query: {
        // me query

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
            return user;
        },

        // save book to user
        saveBook: async (parent, { _id, content }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id },
                { $addToSet: { savedBooks: content } },
                { new: true, runValidators: true }
            );
            return updatedUser;
        }
    }
};

module.exports = resolvers;