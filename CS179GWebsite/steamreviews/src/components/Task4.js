import React, { useState, useEffect } from 'react'
import './Task4.css'

const Task4 = () => {    
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('desc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/task4?page=${page}&sortBy=${sortBy}`);
        console.log(`Fetching data from: http://localhost:5000/task4?page=${page}&sortBy=${sortBy}`); // Log the URL
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [page, sortBy]); // Refetch data when the page changes

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
    console.log(page);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
      console.log(page);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };
  
  return (
    <div className="Task4-Body">
      <h2>Are there certain keywords or phrases that lead to a review being marked
as helpful?</h2>
      <div className="sort-options">
        <label htmlFor="sort-by">Sort By:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="desc">Descending Count</option>
          <option value="asc">Ascending Count</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            {/*Change the column names for the names of the actual column names for each specific task*/}
            <th>Token</th> 
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key ={task.token}>
              {/* Have the data represented here from each row for each column*/}
              <td>{task.token}</td>
              <td>{task.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>                
  )
}

export default Task4;
