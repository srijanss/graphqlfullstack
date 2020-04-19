import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

// Components
import BookDetails from "./BookDetails";

export const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

export default (props) => {
  const [showBookDetails, setShowBookDetails] = useState(null);
  const { loading, error, data, refetch } = useQuery(getBooksQuery);
  useEffect(() => {
    if (props.booksRefetch) {
      setTimeout(() => {
        refetch();
      }, 10);
    }
  });

  if (loading) return <p>Loading books ... </p>;
  if (error) return <p>Error</p>;
  return (
    <div>
      <ul id="book-list">
        {data &&
          data.books &&
          data.books.length > 0 &&
          data.books.map((book) => (
            <li
              style={{ cursor: "pointer" }}
              key={`book-${book.id}`}
              onClick={() => setShowBookDetails(book.id)}
            >
              {book.name}
            </li>
          ))}
      </ul>
      {showBookDetails && <BookDetails bookId={showBookDetails} />}
    </div>
  );
};
