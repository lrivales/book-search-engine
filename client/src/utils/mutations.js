import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation SaveBook($id: ID!, $content: bookData!) {
        saveBook(_id: $id, content: $content) {
            _id
            username
            email
            bookCount
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation RemoveBook($id: ID!, $bookId: ID!) {
        removeBook(_id: $id, bookId: $bookId) {
            _id
            username
            email
            bookCount
        }
    }
`;