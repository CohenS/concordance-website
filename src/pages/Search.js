const Search=()=>{
    return(
        <div className="view-words">
      <div className="view-words-container">
          <div className="pt-2 pb-2 text-center">
            <h4>Words Filter</h4>
          </div>
        <form className="d-flex flex-row">
          
          
          <div className="col-12 border">
            <div className="d-flex flex-column p-3">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Insert a phrase
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Parase to be searched
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="view-words-container">
        <div className="d-flex flex-row">
          <div className="col-12 border">
            <div className="results-filter p-2">
              <h5>Results</h5>
            </div>
            <div className="border-bottom">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Book</th>                    
                    <th scope="col">Sentence</th>
                    <th scope="col">Start Sentence Index</th>
                    <th scope="col">End Sentence Index</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default Search;