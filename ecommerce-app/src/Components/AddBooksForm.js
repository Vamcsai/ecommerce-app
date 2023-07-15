import "./AddBooksForm.scss";
import axios from "axios";
import { useContext, useState } from "react";
import { AddBooksFormContext } from "./Contexts/AddBookFormContext";

export default function AddBooksForm() {
  const { showAddBookForm, setShowAddBookForm } =
    useContext(AddBooksFormContext);

  const [addBookFormResult, setAddBookFormResult] = useState("");

  async function addBook(e) {
    e.preventDefault();
    const addBookForm = document.querySelector("#addbookform");
    const addBookFormData = new FormData(addBookForm);
    const addBookFormButton = document.getElementById("bookadd-button");
    const addBookFormResult = document.getElementsByClassName(
      "addbook-form-result"
    )[0];
    addBookFormButton.classList.add("button-disable");
    addBookFormButton.innerHTML = "<div id='addbook-button-loading'><div>";
    await axios
      .post("http://localhost:3001/api/addbook", addBookFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        addBookFormResult.style.color = "green";
        setAddBookFormResult("Success");
        addBookFormButton.innerHTML = "Add";
        addBookFormButton.classList.remove("button-disable");
        addBookForm.reset();
        setTimeout(() => {
          setShowAddBookForm(false);
          setAddBookFormResult("");
        }, 500);
      })
      .catch((err) => {
        addBookFormResult.style.color = "red";
        if (err.response) {
          setAddBookFormResult(err.response.data.result);
        } else {
          setAddBookFormResult("Something went wrong, Try Again!");
        }
        addBookFormButton.innerHTML = "Add";
        addBookFormButton.classList.remove("button-disable");
        addBookForm.reset();
      });
  }

  return showAddBookForm ? (
    <div className="add-book-form-container">
      <div className="add-book-form-main">
        <div className="add-book-form-header">
          <span>Add Book</span>
          <div
            id="add-book-form-close-button"
            onClick={() => {
              setShowAddBookForm(false);
              setAddBookFormResult("");
            }}
          >
            ×
          </div>
        </div>

        <form id="addbookform" onSubmit={addBook}>
          <label htmlFor="bookname">Name</label>
          <input
            type="text"
            id="bookname"
            name="bookname"
            placeholder="Enter Book Name"
            required
          />
          <label htmlFor="bookauthor">Author</label>
          <input
            type="text"
            id="bookauthor"
            name="bookauthor"
            placeholder="Enter Book Author"
            required
          />
          <label htmlFor="bookprice">Price</label>
          <input
            type="text"
            id="bookprice"
            name="bookprice"
            placeholder="Enter Book Price"
            required
          />
          <input type="file" id="bookimage" name="bookimage" required />
          <button type="submit" id="bookadd-button">
            Add
          </button>
        </form>
        <div className="addbook-form-result">{addBookFormResult}</div>
      </div>
    </div>
  ) : (
    <></>
  );
}
