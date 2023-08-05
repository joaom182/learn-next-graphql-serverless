import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { Field, ObjectType, Query, Resolver, buildSchema } from "type-graphql";

@ObjectType()
export class Status {
  @Field()
  ok!: boolean;
}

@Resolver(Status)
export class StatusResolver {
  @Query(() => Status)
  status(): Status {
    return { ok: true };
  }
}

const schema = await buildSchema({
  resolvers: [StatusResolver],
});

const server = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
