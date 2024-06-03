import React, { useState, useEffect } from 'react'
import './Task4.css'

const Task4 = () => {    
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/task4')
    .then(response => response.json())
    .then(data => setTasks(data))
    .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const limitedTasks = tasks.slice(0, 5); //fetch up to 5 rows 

  return (
    <div className="Task4-Body">
      <h2>Are there certain keywords or phrases that lead to a review being marked
as helpful?</h2>
      <table>
        <thead>
          <tr>
            {/*Change the column names for the names of the actual column names for each specific task*/}
            <th>Column 1</th> 
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
          </tr>
        </thead>
        <tbody>
          {limitedTasks.map(task => (
            <tr>
              {/* Have the data represented here from each row for each column*/}
              <td>{task.column1}</td>
              <td>{task.column2}</td>
              <td>{task.column3}</td>
              <td>{task.column4}</td>
              <td>{task.column5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>                
  )
}

export default Task4;