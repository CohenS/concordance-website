const Statistics = () => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row">
        <div class="card col-6">
          <div className="p-2">
            <h4>General Statistics</h4>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total Books</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total Books Size</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total Groups</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Avetage Words in Group</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total Phrases</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Avarage Words in Phrases</span>
              <span>Null</span>
            </li>
          </ul>
        </div>
        <div class="card col-6">
          <div className="p-2">
            <h4>Book Statistics</h4>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total Words</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total Unique Words</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total Letters</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Avetage Letters in Word</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total Phrases</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Avarage Words in Phrases</span>
              <span>Null</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex flex-row">
        <div class="card col-4">
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total Paragraphs</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Average Words in Paragraph</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Average Letters in Paragraph</span>
              <span>Null</span>
            </li>
          </ul>
        </div>
        <div class="card col-4">
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total Lines</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Average Words in Line</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Average Letters in Line</span>
              <span>Null</span>
            </li>
          </ul>
        </div>
        <div class="card col-4">
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Total Sentences</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Average Words in Sentences</span>
              <span>Null</span>
            </li>
            <li class="list-group-item d-flex flex-row justify-content-between">
              <span>Average Letters in Sentences</span>
              <span>Null</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Statistics;
