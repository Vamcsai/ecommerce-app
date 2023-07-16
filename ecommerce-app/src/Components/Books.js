import { useState } from "react";
import "./Books.scss";

export default function Books() {
  const [booksData, setBooksData] = useState([1 , 2 ,3, 4, 5,]);
  const [booksExits, setBooksExits] = useState(true);

  return (
    <div className="books-container">
      {booksExits ? (
        booksData.map((book) => {
          
          return (
            <div key={book["ID"]} className="books-body">
              <div className="book-content"></div>
              <button>ADD TO CART</button>
            </div>
          );
        })
      ) : (
        <div className="main-body-nobooks">No Books Found</div>
      )}
    </div>
  );
}
