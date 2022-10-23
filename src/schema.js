const { gql } = require('apollo-server')
const { prisma } = require('./db')
const { authenticate } = require('./auth')

const typeDefs = gql`
  type Pfp {
    user: String!
    img: String!
  }

  type Query {
    q(user: String!): Pfp
  }

  type Mutation {
    update(token: String!, img: String!): Pfp
  }
`

const resolvers = {
    Query: {
        q: (_, args) => {
            return prisma.pfp.findUnique({
                where: {
                    user: args.user
                }
            });
        }
    },
    Mutation: {
        update: (_, args) => {
            user = authenticate(args.token);
            return prisma.pfp.findUnique({
                where: {
                    user
                }
            }).then((pfp) => {
                if (!pfp) {
                    return prisma.pfp.create({
                        data: {
                            user: user,
                            img: args.img
                        }
                    });
                }
                return prisma.pfp.update({
                    where: {
                        user
                    },
                    data: {
                        img: args.img
                    }
                });
            })
        }
    }
}


module.exports = {
    resolvers,
    typeDefs,
}