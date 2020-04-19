import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;

export default (props) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  if (loading) return <p>Loading authors ... </p>;
  if (error) return <p>Error</p>;

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log({ name, genre, authorId });
    addBook({ variables: { name: name, genre: genre, authorId: authorId } });
    props.booksRefetch(true);
  };

  return (
    <div>
      <form id="add-book" onSubmit={onSubmitForm}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => setAuthorId(e.target.value)}>
            <option>Select Author</option>
            {data &&
              data.authors &&
              data.authors.length > 0 &&
              data.authors.map((author) => (
                <option key={`author-${author.id}`} value={author.id}>
                  {author.name}
                </option>
              ))}
          </select>
        </div>
        <button type="submit">+</button>
      </form>
    </div>
  );
};
