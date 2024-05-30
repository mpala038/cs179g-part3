import './App.css';
import Task1 from './components/Task1.js';
import Task2 from './components/Task2.js';
import Task3 from './components/Task3.js';
import Task4 from './components/Task4.js';
import Task5 from './components/Task5.js';
import Task6 from './components/Task6.js';


function App() {
  return (
    <div className="Website">
      <div className="Web-Header">
        <h1>STEAMY REVIEWS</h1>
      </div>
      <div className="Web-Body"> 
        <Task1></Task1>
        <Task2></Task2>
        <Task3></Task3>
        <Task4></Task4>
        <Task5></Task5>
        <Task6></Task6>
      </div>
    </div>
  );
}

export default App;
