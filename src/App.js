import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import dashBoard from './DashBoard/Dashboard'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/dashboard" component={dashBoard} exact />
      </div>
    </Router>
  );
}

export default App;
