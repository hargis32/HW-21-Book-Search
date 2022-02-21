// exports typeDefs and resolvers schemas to the server.js to be used with Apollo
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };