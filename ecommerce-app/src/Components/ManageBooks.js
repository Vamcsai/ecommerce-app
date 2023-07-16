import { useEffect, useState } from "react";
import "./ManageBooks.scss";
import AddBooksForm from "./AddBooksForm";
import { AddBooksFormContext } from "./Contexts/AddBookFormContext";
import axios from "axios";

export default function ManageBooks() {
  const [booksData, setbooksData] = useState([]);
  const [bookDataExists, setBookDataExists] = useState(false);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    async function getBooksData() {
      await axios
        .get("http://localhost:3001/api/getbooks")
        .then((res) => {
          console.log(res)
          setbooksData(res.data.result);
        })
        .catch((err) => {
          if (err.response) {
            console.log("Express Error");
          } else {
            console.log("Axios Error");
          }
          setBookDataExists(true);
        });
    }
    getBooksData();
  }, [showAddBookForm]);
  return (
    <div className="add-books-container">
      <div className="add-books-header">
        <h2>Books Overview</h2>
        <button
          onClick={() => {
            setShowAddBookForm(true);
          }}
        >
          Add Book
        </button>
        <button onClick={() => {
                                console.log(selectedRows); 
        }}>Delete</button>
      </div>
      <table className="add-books-body">
        <colgroup>
        <col class="bookselect" />
          <col class="bookid" />
          <col class="bookimage" />
          <col class="bookname" />
          <col class="bookauthor" />
          <col class="bookprice" />
        </colgroup>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Author</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookDataExists ? (
            <tr>
              <td colSpan={5}>
                Unable to Fetch Data..Try Again After Sometime
              </td>
            </tr>
          ) : (
            Object.entries(booksData).map((book) => {
              return (
                <tr key={book[0]}>
                  <td><input type="checkbox" onChange={(e) => {
                    if(e.target.checked){
                      setSelectedRows([...selectedRows, book[1].bookid]);
                    }else if(!e.target.checked){
                      selectedRows.splice(selectedRows.indexOf(book[1].bookid), 1);
                    }
                  }} /></td>
                  <td>{book[1].bookid}</td>
                  <td> 
                    <img src={`data:image/png;base64,${book[1].bookimage}`} />
                  </td>
                  <td>{book[1].bookname}</td>
                  <td>{book[1].bookauthor}</td>
                  <td>{book[1].bookprice}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <AddBooksFormContext.Provider
        value={{ showAddBookForm, setShowAddBookForm }}
      >
        <AddBooksForm />
      </AddBooksFormContext.Provider>
    </div>
  );
}
