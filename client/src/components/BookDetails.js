import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export default (props) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: props.bookId },
  });

  if (loading) return <p>Loading books ... </p>;
  if (error) return <p>Error</p>;
  return (
    <div>
      {props.bookId && data && data.book ? (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <h3>Author</h3>
          <p>{`${data.book.author.name} - ${data.book.author.age}`}</p>
          <p>All the books by this author</p>
          <ul>
            {data.book.author.books.length > 0 &&
              data.book.author.books.map((item) => (
                <li key={`book-${item.id}`}>{item.name}</li>
              ))}
          </ul>
        </div>
      ) : (
        <p>Output book details</p>
      )}
    </div>
  );
};
