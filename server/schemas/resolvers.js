const { AuthenticationError } = require('apollo-server-express');
// only import User. Book.js is a subschema, so not its own model 
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: {
            
        }

    },

    Mutation: {
        login: {

        },
        addUser: {

        },
        saveBook: {

        },
        removeBook: {

        },
    }

}