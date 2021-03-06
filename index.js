const { ApolloServer, gql, ApolloError } = require('apollo-server');
//const sessions = require('./data/sessions.json')
const SessionAPI = require('./datasources/sessions');
const SpeakerAPI = require('./datasources/speakers');

const typeDefs = require('./schema.js')
const resolvers = require('./resolver.js')

const dataSources = () => ({
  sessionAPI: new SessionAPI()
  , speakerAPI: new SpeakerAPI()
});

const server = new ApolloServer({
  typeDefs
  , resolvers
  , dataSources
  //  , introspection: false
  //  , playground: false
  //  , debug: false
  , formatError: (err) => {
    if (err.extensions.code == 'INTERNAL_SERVER_ERROR') {
      return new ApolloError(`'INTERNAL_SERVER_ERROR' - Try $'npm start' from the 'speakers' dir`)
    }
    return err;
  }
});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`graphQL running at ${url}`);
})