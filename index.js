const {ApolloServer, PubSub} = require('apollo-server');
// const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const {MONGO_DB} = require('./config');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req, pubsub}),
});

mongoose
  .connect(MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log(`Mongodb connected`);
    return server.listen({port: 5000});
  })
  .then((res) => {
    console.log(`Apollo Server running at ${res.url}`);
  });
