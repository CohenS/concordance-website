import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReactiveButton from 'reactive-button';

const ViewWords = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();
  const onSearch = async (e) => {

    const words = searchPhrase.split(' ');
    const api = `https://concordance-app-20230814001517.braveisland-0812a3d8.eastus.azurecontainerapps.io/Book/SearchByPhrase`;
    axios
    .post(api, words,
    {
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        setSearchResults(response.data)
    })
    .catch((error) => {
        console.log(JSON.stringify(error))
      });
  };

  return (
    <div className="view-words">
      <div className="view-words-container">
          <div className="pt-2 pb-2 text-center">
            <h4>Phrase Search</h4>
          </div>
        <form className="d-flex flex-row">
          <div className="col-3 border">
            <div className="d-flex flex-column p-3">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Phrase
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setSearchPhrase(e.target.value)}
                />
                <ReactiveButton style={{marginTop:10}} color='light' onClick={onSearch} idleText='Search'></ReactiveButton>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="view-words-container">
        <div className="d-flex flex-row">
          <div className="col-9 border" style={{height: 800, maxHeight:800, overflowY:"scroll",}}>

            <div className="border-bottom">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Book Name</th>
                    <th scope="col">Start Word Index</th>
                    <th scope="col">Start Word Line</th>
                    <th scope="col">Start Word Paragraph</th>
                    <th scope="col">Start Word Chapter</th>
                    <th scope="col">End Word Index</th>
                    <th scope="col">End Word Line</th>
                    <th scope="col">End Word Paragraph</th>
                    <th scope="col">End Word Chapter</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((r, i)=> 
                      <tr onClick={() => {
                        const searchIndex = searchResults
                        ?.filter((r) => r.bookName === r.bookName)
                        ?.findIndex(v => v === r);
                        history.push(`/searchTextInBook/${r.bookName}/${searchPhrase}/${searchIndex}`)}
                      }>
                        <th scope="row">{i}</th>
                        <td>{r.bookName}</td>
                        <td>{r.startWordNumber}</td>
                        <td>{r.startWordLine}</td>
                        <td>{r.startWordParagraph}</td>
                        <td>{r.startWordChapter}</td>
                        <td>{r.endWordNumber}</td>
                        <td>{r.endWordLine}</td>
                        <td>{r.endWordParagraph}</td>
                        <td>{r.endWordChapter}</td>
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
