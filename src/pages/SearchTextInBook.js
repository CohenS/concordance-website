import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react';
import "./ViewWords.css";
import ReactiveButton from 'reactive-button';

const SelectedMatch = ({part, i}) => {

useEffect(() => {
  document.getElementById(i)?.scrollIntoView({ behavior: 'smooth' });
}, []);

  return(
    <span
      id={i}
      key={i}
      style={{ backgroundColor: '#00cdff' }} >
      {part}
    </span> 
  )
}

export default function SearchTextInBook() {
  const [searchBoxValue, setSearchBoxValue] = useState('  ');

  const [search, setSearch] = useState('  ');
  const [isLoading, setIsLoading] = useState(false);
  let { inputBookName, inputSearchTerm, inputSearchIndex } = useParams()

  const [searchIndex, setSearchIndex] = useState(0);
  
  const loadBookByName = async (bookNameArg) => {
    setIsLoading(true);
    const api = `https://concordance-app-20230814001517.braveisland-0812a3d8.eastus.azurecontainerapps.io/Book/GetBookByName/${bookNameArg}`;
    axios
      .get(api)
      .then((response) => {
        setIsLoading(false);
        setBookContent(response.data);

      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        setIsLoading(false);
      });
  };


  useEffect(async () => {
    if (inputBookName && inputSearchTerm && inputSearchIndex)
    {
      setBookName(inputBookName);
      await loadBookByName(inputBookName)
      setSearchBoxValue(inputSearchTerm);
      setSearch(inputSearchTerm);          
      setSearchIndex(parseInt(inputSearchIndex))
    }
  }, [inputBookName, inputSearchTerm, inputSearchIndex]);


  const [triggerSearchRender, setTriggerSearchRender] = useState(0);

  useEffect(() => {
    const matchIndex = matches[searchIndex]?.i;
    if (matchIndex && matchIndex !== 0 ) document.getElementById(matchIndex)?.scrollIntoView({  });
  }, [searchIndex, triggerSearchRender]);
  
  
  const handleSFChange = (value) => {
    if (value !== ' ' && value.length !== 0)
      setSearchBoxValue(value);
    else setSearchBoxValue('  ');
  };

  const [bookName, setBookName] = useState("");  
  const [bookContent, setBookContent] = useState("");

  const parts = search  === '  ' ? [bookContent] : bookContent.split(new RegExp(`(${search})`, 'gi'));
  const matches = parts
    .map((part, i) => ({
      part: part,
      i: i,
      isMatch: part.toLowerCase() === search.toLowerCase(),
    }))
    .filter((m) => m.isMatch);

  return (
    <div className="App">
      <div>   
        <div style={{position: 'fixed', top:60, left:0, display:'flex', flexDirection:'column'}} >
        <input
          type="search"    
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <button className="click" onClick={() => loadBookByName(bookName)} style={{marginTop: 2, marginLeft:2, marginRight: 2}}>
            Get Book
        </button>
        </div> 
        <div style={{position: 'fixed', top:120, left:0, display:'flex', flexDirection:'column'}}>      
        <input   
          placeholder="search"
          type="Search"     
          value={searchBoxValue} 
          onChange={(e) => handleSFChange(e.target.value)}
        />
        <button className="click" onClick={() => { setSearch(searchBoxValue); setTriggerSearchRender(triggerSearchRender + 1); }} style={{marginTop: 2, marginLeft:2, marginRight: 2}}>
            Search
        </button>
        </div> 
        { isLoading?   
        <SpinnerCircular
          color={"#78b7ef"}

      />  :
        <div style={{height: 650, maxHeight:650, overflowY:"scroll", marginLeft: 80}}> 
        <div
          style={{
            position: 'fixed',
            top:180,
            left:0,
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{display: 'flex',
            flexDirection: 'row',}}>
          <div className="click"
            style={{ backgroundColor:'white', borderRadius:7, overflow:'hidden', zIndex: 99 }}
            onClick={() => {setSearchIndex(Math.max(0, searchIndex - 1));
            }}>
          <ReactiveButton style={{  }} idleText="Previous"/>
          </div>
          <div className="click"
            style={{ zIndex: 99, borderRadius:7, overflow:'hidden', marginLeft:5}}
            onClick={() => {
              setSearchIndex(Math.min(searchIndex + 1, matches.length -1 ));
            }}
          >
            <ReactiveButton idleText="Next"/>
          </div>
          </div>
          <div style={{alignSelf:'center'}}> 
            {matches.length == 0 ? 0 : searchIndex + 1} / {matches.length}
          </div>
        </div>
          <span>
          {parts.map((part, i) => {
            const isMatch = part.toLowerCase() === search.toLowerCase();
            const isSelectedMatch = (isMatch && i === matches[Math.min(Math.max(searchIndex, 0), matches.length)]?.i);

                return isSelectedMatch ?
                (<SelectedMatch i={i} part={part}/>)
              :                
              (<span
              id={i}
              key={i}
              style={
                isMatch
                ? { backgroundColor: 'yellow' }
                : {}
              }
              >
              {part}
              </span>)

          })}
        </span>
      </div>}
      </div>
    </div>
  );
}
