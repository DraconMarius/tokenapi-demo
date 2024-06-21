
// import 'bulma/css/bulma.min.css'
import '@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css';
import './App.scss';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Nav from './cont/Nav';
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
              <Route exact path="/" element={<Navigate replace to="/search" />} />
              <Route exact path="/search" element={<Disp />} />
            </Routes>
          </div>
        </Router>
        {/* <Footer /> */}
      </SearchProvider>
    </div >
  );
}

export default App;
