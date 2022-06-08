import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HeaderImage from '../images/top-nav-bar-img.png'

const linkStyle = {
  textDecoration: "none",
  color: 'white'
};

function DefaultPage() {
  return (
    <div>
      <header className="App-header">
{/* ----------------------- nba image for top nav bar --------------- */}
        <img src={HeaderImage} alt="Header" loading="lazy" />
      </header>
      <Button variant="contained" sx={{'margin':2}}>
        <Link style={linkStyle} to="/dashboard/players">Launch Application</Link>
      </Button>
    </div>
  );
}

export default DefaultPage;