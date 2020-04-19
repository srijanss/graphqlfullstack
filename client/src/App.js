import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

// Components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// Apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

export default () => {
  const [booksRefetch, setBooksRefetch] = useState(false);

  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList booksRefetch={booksRefetch} />
        <AddBook booksRefetch={(status) => setBooksRefetch(status)} />
      </div>
    </ApolloProvider>
  );
};
