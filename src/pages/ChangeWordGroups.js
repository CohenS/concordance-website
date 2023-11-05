import { useState} from "react";
import axios from "axios";
import "./ViewWords.css";
import ReactiveButton from 'reactive-button';

 

const ChangeWordGroups = () => {
  const [bookName, setBookName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onSearch = async () => {
    const api = `https://concordance-app-20230814001517.braveisland-0812a3d8.eastus.azurecontainerapps.io/Book/GetWordGroupsByBookName/`+ bookName;
    axios
      .get(api)
      .then((response) => {
        console.log(JSON.stringify(response))
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error))
      });
  };


  // const ChangeWordGroup = () =>
  //   <Header/>
  //   <SearchBar/>
  //   <SearchResults/>

  const EditWordGroup = ({words, bookID, wordGroupName}) =>
  {
    const [wordGroupWords, setWordGroupWords] = useState(words);
    
    const onSave = async (words) => {
      const wordsToUpdate = words.split(",");
      const updateWordGroupJson = ({BookID: bookID, WordGroupName: wordGroupName, Words: wordsToUpdate })
      console.log(JSON.stringify(updateWordGroupJson));
      const api = `https://concordance-app-20230814001517.braveisland-0812a3d8.eastus.azurecontainerapps.io/Book/UpdateWordGroup/`;
      axios
      .post(api, JSON.stringify(updateWordGroupJson), { headers: {'Content-Type': 'application/json'} })  
      .then((response) => {
        console.log(JSON.stringify(response))
      })
        .catch((error) => {
          console.log(JSON.stringify(error))
        });
    };

    return(
      <td style={{display:'flex'}}>            
        <input style={{height:30, width: 300, }}     
          class="form-control" 
          value={wordGroupWords}
          onChangeCapture={(e) =>{setWordGroupWords(e.target.value)}}
          >
        </input> 
        <ReactiveButton style={{height:10, marginLeft:20, marginTop: -2}} onClick={onSave(wordGroupWords)} idleText='save'></ReactiveButton>
      </td>
    )
  }

  const AddWordGroup = ({bookName}) =>
  {
    const [wordGroupWords, setWordGroupWords] = useState("");
    const [wordGroupName, setWordGroupName] = useState("");
    const onSave = async () => {

      const words = wordGroupWords.split(",");

      const updateWordGroupJson = ({BookName: bookName, WordGroupName: wordGroupName, WordGroupWords: words })
      console.log(JSON.stringify(updateWordGroupJson));
      const api = `https://concordance-app-20230814001517.braveisland-0812a3d8.eastus.azurecontainerapps.io/Book/InsertWordGroupByBookName/`;
      axios
      .post(api, JSON.stringify(updateWordGroupJson), { headers: {'Content-Type': 'application/json'} })  
      .then(async (response) => {
        await onSearch();
      })
        .catch((error) => {
          console.log(JSON.stringify(error))
        });
    };

    return(
      <tr >  
      <th></th>
      <td ></td>
      <td >
        <input style={{height:30, width: 300, }}     
            class="form-control" 
            value={wordGroupName}
            onChangeCapture={(e) =>{setWordGroupName(e.target.value)}}
            >
          </input> 
      </td>
      <td style={{display:'flex'}}>            
        <input style={{height:30, width: 300, }}     
          class="form-control" 
          value={wordGroupWords}
          onChangeCapture={(e) =>{setWordGroupWords(e.target.value)}}
          >
        </input> 
        <ReactiveButton style={{height:20, marginLeft:20, marginTop: -2}} onClick={() => onSave()} idleText='add'></ReactiveButton>
      </td>
  </tr>
    
    )
  }

  return (
    <div className="view-words">
      <div className="view-words-container">
          <div className="pt-2 pb-2 text-center">
            <h4>Change word groups</h4>
          </div>
        <form className="d-flex flex-row">
          <div className="col-3 border">
            <div className="d-flex flex-column p-3">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Book Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setBookName(e.target.value)}
                />
                <ReactiveButton style={{marginTop:10}} color='light' onClick={onSearch} idleText='Search By Book Name'></ReactiveButton>
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
                    <th scope="col">Word group</th>
                    <th scope="col">Words</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((r,i) =>
                      <tr >  
                        <th> {i}</th>
                        <td >{r.bookName}</td>
                        <td >{r.wordGroupname}</td>
                        <EditWordGroup words={r.words} wordGroupName={r.wordGroupname} bookID={r.bookID}></EditWordGroup>
                    </tr>
                  )
                }
                  <AddWordGroup bookName={bookName}/>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeWordGroups;
