import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
//import {Route} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import NotesListpage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";


function App() {
  return (
        <Router>
            <div className="container dark">
                <div className="app">
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<NotesListpage/>}/>
                        <Route path="/note/:id" element={<NotePage/>}/>
                    </Routes>
                </div>
            </div>
        </Router>

  );
}

export default App;
