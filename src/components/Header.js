import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation();
  const highliteColor = "#1E88E5"
  return (
    <div className="header">
      <div className="header-container container" style={{display:'flex'}}>
        <Link to="/" style={{display: 'flex',paddingRight:10,  justifyContent: 'center', alignText:'center', borderBottom: '2px solid', borderColor: location.pathname === ('/') ? highliteColor : '#F8F9FD'}}>
        Insert Book Data</Link>
        <Link style={{ borderBottom: '2px solid', display:'flex', paddingRight:10,  borderColor: location.pathname.startsWith('/searchTextInBook') ? highliteColor : '#F8F9FD' }}
          to="/searchTextInBook/">Search in book</Link> 
        <Link to="/searchbyword" style={{borderBottom: '2px solid',paddingRight:10,  borderColor: location.pathname.startsWith('/searchbyword') ? highliteColor : '#F8F9FD' }}
        >Search By Word</Link>
        <Link to="/searchbyphrase"
          style={{borderBottom: '2px solid',paddingRight:10,  borderColor: location.pathname.startsWith('/searchbyphrase') ? highliteColor : '#F8F9FD' }}>
            Search By Phrase</Link>
            <Link to="/searchbylocation"
          style={{borderBottom: '2px solid',paddingRight:10,  borderColor: location.pathname.startsWith('/searchbylocation') ? highliteColor : '#F8F9FD' }}>
            Search By Location</Link>
        <Link to="/word-groups"
          style={{borderBottom: '2px solid',paddingRight:10,  borderColor: location.pathname.startsWith('/word-groups') ? highliteColor : '#F8F9FD'}}>
          Search by Word Group</Link>
          <Link to="/changewordgroup" style={{borderBottom: '2px solid', paddingRight:10, borderColor: location.pathname.startsWith('/changewordgroup') ? highliteColor : '#F8F9FD'}}>
          Change Word Group</Link>
        <Link to="/statistics" style={{borderBottom: '2px solid',paddingRight:10,  borderColor: location.pathname.startsWith('/statistics') ? highliteColor : '#F8F9FD'}}>
          Statistics</Link>
      </div>
    </div>
  );
};
export default Header;
