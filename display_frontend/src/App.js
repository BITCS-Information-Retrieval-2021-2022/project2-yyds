// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import AuthorProfile from "./pages/AuthorProfile";
import Error from "./pages/Error";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/index.html" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/author/:authorId" element={<AuthorProfile />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </Router>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
