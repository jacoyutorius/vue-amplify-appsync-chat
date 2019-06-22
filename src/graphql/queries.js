// eslint-disable
// this is an auto generated file. This will be overwritten

export const getChat = `query GetChat($id: ID!) {
  getChat(id: $id) {
    id
    name
    message
  }
}
`;
export const listChats = `query ListChats(
  $filter: ModelChatFilterInput
  $limit: Int
  $nextToken: String
) {
  listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      message
    }
    nextToken
  }
}
`;
