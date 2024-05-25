import './App.css';
import 'bulma/css/bulma.min.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Nav from './cont/Nav';
import Default from './cont/Default'
import Disp from './cont/Disp';
// import Footer from './cont/Footer';
import { SearchProvider } from './cont/searchContext';




function App() {


  return (
    <div >
      <SearchProvider>
        <Router>
          <Nav />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Default />} />
              <Route exact path="/balances" element={<Disp type={"balance"} />} />
              <Route exact path="/transactions" element={<Disp type={"transaction"} />} />
            </Routes>
          </div>
        </Router>
        {/* <Footer /> */}
      </SearchProvider>
    </div >
  );
}

export default App;
