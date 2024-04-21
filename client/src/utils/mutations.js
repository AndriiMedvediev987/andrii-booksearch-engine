import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(input: BookInput, userID: ID!) {
    saveBook(input: BookInput, userID: ID!){
      token,
      user {
        _id
        username
      }
    }
}
`;
export const REMOVE_BOOK = gql`
  mutation removeBook(userID: ID!, bookID: ID!) {
    removeBook(userID: ID!, bookID: ID!){
      token,
      user {
        _id
        username
      }
    }
}
`;
