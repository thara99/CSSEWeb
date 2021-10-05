import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import dashBoard from './DashBoard/Dashboard'
import timeTable from './TimeTable/TimeTable'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/dashboard" component={dashBoard} exact />
        <Route path="/timetable" component={timeTable} exact />
      </div>
    </Router>
  );
}

export default App;
