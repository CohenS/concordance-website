import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {parseBookInformation, parseWords} from "../bookParsing/parser";

// const handleDrop = files => {
//   // Push all the axios request promise into a single array
//   const uploaders = files.map(file => {
//     // Initial FormData
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("tags", `codeinfuse, medium, gist`);
//     formData.append("upload_preset", "pvhilzh7"); // Replace the preset name with your own
//     formData.append("api_key", "778788693832211"); // Replace API key with your own Cloudinary key
//     formData.append("timestamp", (Date.now() / 1000) | 0);

//     // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
//     return axios.post("https://api.cloudinary.com/v1_1/freelanceri/image/upload", formData, {
//       headers: { "X-Requested-With": "XMLHttpRequest" },
//     }).then(response => {
//       const data = response.data;
//       const fileURL = data.secure_url // You should store this URL for future references in your app
//       console.log(data);
//     })
//   });

//   // Once all the files are uploaded
//   axios.all(uploaders).then(() => {
//     // ... perform after upload is successful operation
//   });
// }

const BookHead = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [getBooks, setBooks] = useState([]);
  const [comment, setComment] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = async (e) => { 
      const text = (e.target.result)
      setFile(text);
    };
    
    fileReader.readAsText(e.target.files[0])
    setFilename(e.target.files[0].name);
  };

  const [bookText, setBookText] = useState('');
  const [words, setWords] = useState('');
  

  const onSubmit = async (e) => {
    e.preventDefault();

    const words = parseWords(file)

    const bookData = parseBookInformation(file)
    const insertBookJson = ({Author: bookData.author, BookName: bookData.Bookname, PublishedDate: bookData.publishedDate, Words: words, Paragraphs:[] })

    const formData = new FormData();
    try {
      const res = await axios.post(
        `https://vslrh63ore.execute-api.us-west-2.amazonaws.com/default/`,
        insertBookJson,
        {
          headers: {
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      // Clear percentage
     
    } catch (err) {
      if (err.response.status === 500) {
      } else {
      }
    }
  };


  useEffect(() => {
    axios.get(`http://localhost:8081/api/files/${5}`).then((response) => {
     setBooks(response.data);
     let textarea = document.querySelector('textarea');
     const lines = response.data.split();
     textarea.value = lines.join('');
     console.log(response.data)
    });
  }, [0]);
  return (
    <div className="book-head">
      <div className="book-head-container container">
        <div className="book-header container">
          <h4>INSERT NEW BOOK</h4>
          <form onSubmit={onSubmit}>
            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                onChange={onChange}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {filename}
              </label>
            </div>

            {/* <Progress percentage={uploadPercentage} /> */}

            <input
              type="submit"
              value="Upload"
              className="btn btn-primary btn-block mt-4"
            />
          </form>
        </div>
        <textarea class="form-control" value={comment} placeholder="Leave a comment here" id="floatingTextarea"></textarea>

        {/* <div className="book-content">
          <div className="book-content-header">
            <h4>INSERT NEW BOOK</h4>
          </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Title</label>
              <input
                type="text"
                name="title"
                value={title}
                class="form-control"
                onChange={(event)=>handleInputChange(event)}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Author</label>
              <input
                type="text"
                name="author"
                value={author}
                class="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Word Appearance</label>
              <input
                type="text"
                class="form-control"
                name="wordappearance"
                value={wordappearance}
                onChange={handleInputChange}
              />
            </div>
            <button class="btn btn-primary mt-4">
              Save
            </button>
          <div className="book-content-table">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">title</th>
                  <th scope="col">author</th>
                  <th scope="col">path</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default BookHead;
