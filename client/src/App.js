import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch,Routes } from 'react-router-dom';
import Words from './components//words/Words'
import Rank from './components/rank/Rank'
function App() {
  return (
    <div className="App">
     <BrowserRouter >
        <Routes>
          <Route exact path="/" element={<Words />}/>
          <Route  path="/rank" element={<Rank />} />
           
        </Routes>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
