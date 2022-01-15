const { Book, User } = require('../models');

const resolvers = {
    Query: {
        // me query

        // get single user
        user: async (parent, { _id, username }) => {
            return User.findOne({ 
                $or: [{ _id }, { username }]
            });
        },

        // get all users
        users: async () => {
            return User.find();
        }
    },

    Mutation: {
        // add user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        }
    }
};

module.exports = resolvers;