import { gql } from '@apollo/client';
// reference typeDefs.js to find out what to fill in via User and saveBookInput
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                description
                title
                bookId
                image
                link
                }
        }
    }

`;