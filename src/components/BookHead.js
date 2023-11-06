import { useState } from "react";
import axios from "axios";
import {parseBookInformation, parseWords} from "../bookParsing/parser";
import { SpinnerCircular } from 'spinners-react';


const BookHead = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [comment, setComment] = useState("");
  const [wordGroupName, setWordGroupName] = useState("");
  const [wordGroupValue, setWordGroupValue] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onChange = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = async (e) => { 
      const text = (e.target.result)
      setFile(text);
    };
    
    fileReader.readAsText(e.target.files[0])
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e,file) => {
    e.preventDefault();
    setIsUploading(true);

    const words = parseWords(file)

    const bookData = parseBookInformation(file)
    const insertBookJson = ({Author: bookData.author, BookName: bookData.bookName, PublishedDate: bookData.publishedDate, Words: words.BookWords, BookContent: words.BookContent})
    const insertApiUrl = 'https://concordance-app-20230814001517.braveisland-0812a3d8.eastus.azurecontainerapps.io/Book/InsertBook';
    const insertWordGroupurl = 'https://concordance-app-20230814001517.braveisland-0812a3d8.eastus.azurecontainerapps.io/Book/InsertWordGroup';

    axios
      .post(insertApiUrl, JSON.stringify(insertBookJson),
       {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (wordGroupName.length > 0 && wordGroupValue.length > 0)
        {
          console.log("uploading word groups")
          const wordGroupWords = wordGroupValue.split(',')
          const insertWordGroupJson = ({BookID: response.data, WordGroupName: wordGroupName, WordGroupWords: wordGroupWords})
        
        return axios
          .post(insertWordGroupurl, JSON.stringify(insertWordGroupJson),
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        }
      })
      .then(_ => { setIsUploading(false); })
      .catch((error) => {
        setIsUploading(false);
        console.log(JSON.stringify(error))
      });

  };

  return (
    <div className="book-head">
      <div className="book-head-container container">
        <div className="book-header container">
          <h4>INSERT NEW BOOK</h4>
          <form onSubmit={(e) => onSubmit(e,file)}>
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
            <input style={{height:40, width: 200, marginBottom:30,}} className="form-control" value={comment} onChange={(e) => setComment(e.nativeEvent.value)} placeholder="Genre" id="floatingTextarea"></input>
            {'Insert Word Group: '}
            <input style={{height:40, width: 400, marginBottom:10, marginTop:10}} 
                className="form-control" 
                value={wordGroupName}
                onChange={(e) => setWordGroupName(e.target.value)}
                placeholder="Word group name(i.e friends)" id="floatingTextarea">
            </input> 
            <input style={{height:40, width: 400, marginBottom:20,}} 
              className="form-control" 
              value={wordGroupValue} 
              onChange={(e) => setWordGroupValue(e.target.value)} 
              placeholder="Word group value(i.e 'John,shay,barak)'"
              id="floatingTextarea">
            </input>
            {isUploading 
              ? 
                <SpinnerCircular/>
              :
              <input
                type="submit"
                defaultValue="Upload"
                className="btn btn-primary btn-block mt-4"
              />
            }
          </form>
        </div>

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