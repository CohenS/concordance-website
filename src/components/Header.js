import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <div className="header-container container">
        <Link to="/">Insert Book</Link>
        <Link to="/view-words">ViewWords</Link>
        <Link to="/word-groups">WordGroups</Link>
        <Link to="/search">Search</Link>
        <Link to="/statistics">Statistics</Link>
        <Link to="/statistics">Logout</Link>
      </div>
    </div>
  );
};
export default Header;
