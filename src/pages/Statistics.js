import { useState, useEffect } from "react";
import axios from "axios";

const Statistics = () => {

  const [booksStats, setBooksStats] = useState({});

  const loadBooksStatistics = async () => {
    const api = `https://concordance-app-20230814001517.braveisland-0812a3d8.eastus.azurecontainerapps.io/BookStatistics/GetAveragetBooksStatistics/`;
    axios
      .get(api)
      .then((response) => {
        setBooksStats(response.data);
        console.log(JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(JSON.stringify(error))
      });
  };
  

  useEffect(()=>{
    loadBooksStatistics();
  }, []) // <-- empty dependency array


  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row">
        <div class="card col-6">
          <div className="p-2">
            <h4>General Statistics</h4>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total books</span>
              <span>{booksStats?.totalBooks}</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total words</span>
              <span>{booksStats?.totalWords}</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total paragraphs</span>
              <span>{booksStats?.totalParagraphs}</span>
            </li>

            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total chapters</span>
              <span>{booksStats?.totalChapters}</span>
            </li>

            {/* public int TotalBooks { get; set; }
        public int AvgWordsPerBook { get; set; }
        public int TotalWords { get; set; }
        public int AvgLinesPerBook { get; set; }
        public int TotalParagraphs { get; set; }
        public int AvgTotalChapters { get; set; }
        public int TotalChapters { get; set; }	} */}
          </ul>
        </div>
        <div class="card col-6">
          <div className="p-2">
            <h4>Book Statistics</h4>
          </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Avarage line characters per book</span>
              <span>{booksStats?.avgLineCharsPerBook}</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Avarage paragraph characters per book</span>
              <span>{booksStats?.avgParagraphCharsPerBook}</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Avarage chapter characters per book</span>
              <span>{booksStats?.avgChapterCharsPerBook}</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Avarage Words per book</span>
              <span>{booksStats?.avgWordsPerBook}</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Avarage lines per book</span>
              <span>{booksStats?.avgLinesPerBook}</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Avarage chapters per book</span>
              <span>{booksStats?.avgTotalChapters}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};
export default Statistics;
