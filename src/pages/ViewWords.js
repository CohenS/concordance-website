import { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import "./ViewWords.css";
import ReactiveButton from 'reactive-button';

const ViewWords = () => {
  
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const history = useHistory();
  const onSearch = async (e) => {
    const api = `https://concordance-app-20230814001517.braveisland-0812a3d8.eastus.azurecontainerapps.io/Book/SearchByWord/${searchWord}`;
    axios
      .get(api)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error))
      });
  };

  return (
    <div className="view-words">
      <div className="view-words-container">
          <div className="pt-2 pb-2 text-center">
            <h4>Words Search</h4>
          </div>
        <form className="d-flex flex-row">
          <div className="col-3 border">
            <div className="d-flex flex-column p-3">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Word
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setSearchWord(e.target.value)}
                />
                <ReactiveButton style={{marginTop:10}} color='light' onClick={onSearch} idleText='Search'></ReactiveButton>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="view-words-container">
        <div className="d-flex flex-row">
          <div className="col-9 border" style={{overflowY:'scroll', height:600}}> 
            <div className="border-bottom">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Book</th>
                    <th scope="col">Index</th>
                    <th scope="col">Chapter</th>

                    <th scope="col">Paragraph</th>
                    <th scope="col">Line</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((r, i)=> 
                      <tr onClick={() => 
                      {
                        const searchIndex = searchResults
                          ?.filter((r) => r.bookName == r.bookName)
                          ?.findIndex(v=> v == r);
                        history.push(`/searchTextInBook/${r.bookName}/${searchWord}/${searchIndex}`)}
                      }>   
                        <th scope="row">{i}</th>
                        <td >{r.bookName}</td>
                        <td>{r.wordNumber}</td>
                        <td>{r.chapter}</td>
                        <td>{r.paragraph}</td>
                        <td>{r.line}</td>
                    </tr>
                  )
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewWords;
