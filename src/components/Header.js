import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <div className="header-container container">
        <Link to="/">Insert Book Data</Link>
        <Link to="/searchbyword">Search By Word</Link>
        <Link to="/searchbyphrase">Search By Phrase</Link>
        <Link to="/word-groups">Search by Word Group</Link>
        <Link to="/statistics">Statistics</Link>
      </div>
    </div>
  );
};
export default Header;
