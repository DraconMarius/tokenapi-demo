import './App.css';
import 'bulma/css/bulma.min.css'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Nav from './cont/Nav';
import Disp from './cont/Disp';
import Footer from './cont/Footer';
import { SearchProvider } from './cont/searchContext';




function App() {


  return (
    <div >
      <SearchProvider>
        <Nav />
        <Router>




          <div className="container">
            <Routes>
              <Route exact path="/" element={<Disp />} />
            </Routes>
          </div>
        </Router>
        {/* <Footer /> */}
      </SearchProvider>
    </div >
  );
}

export default App;
