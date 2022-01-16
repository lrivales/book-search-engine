const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]
    }

    type Query {
        me: User
        getSingleUser(_id: ID, username: String): User
        getAllUsers: [User]
    }

    
    input bookData {
            authors: [String]
            description: String
            bookId: String
            image: String
            link: String
            title: String
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        saveBook(_id: ID!, content: bookData! ): User
    }
`;

module.exports = typeDefs;