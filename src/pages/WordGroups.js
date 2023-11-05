import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./ViewWords.css";
import ReactiveButton from 'reactive-button';

const WordGroups = () => {
  
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const history = useHistory();
  const onSearch = async (e) => {
    const api = `https://concordance-app-20230814001517.braveisland-0812a3d8.eastus.azurecontainerapps.io/Book/GetWordsByWordGroup/${searchWord}`;
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
            <h4>Search by word group</h4>
          </div>
        <form className="d-flex flex-row">
          <div className="col-3 border">
            <div className="d-flex flex-column p-3">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Word Group
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setSearchWord(e.target.value)}
                />
                <ReactiveButton style={{marginTop:10}} color='light' onClick={onSearch} idleText='Search By Word Group'></ReactiveButton>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="view-words-container">
        <div className="d-flex flex-row">
          <div className="col-9 border">

            <div className="border-bottom" style={{overflowY:'scroll', height:600}}>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Book</th>
                    <th scope="col">Word</th>
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
                          ?.filter((searchResult) => searchResult.bookName == r.bookName && searchResult.value == r.value) 
                          ?.findIndex(v=> v == r);
                        history.push(`/searchTextInBook/${r.bookName}/${r.value}/${searchIndex}`)}
                      }>   
                        <th scope="row">{i}</th>
                        <td >{r.bookName}</td>
                        <td >{r.value}</td>

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
export default WordGroups;
