import React, { useState, useEffect } from 'react'
import './Task3.css'

const Task3 = () => {    
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [appName, setAppName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedAppName = encodeURIComponent(appName);
        const response = await fetch(`http://localhost:5000/task3?page=${page}&appName=${appName}`);
        console.log(`Fetching data from: http://localhost:5000/task3?page=${page}&appName=${appName}`); // Log the URL
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [page, appName]); // Refetch data when the page changes

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

  const handleSearch = () => {
    setAppName(searchTerm);
    setPage(1); // Reset to first page on new search
  };

  return (
    <div className="Task3-Body">
        <h2>Did people overall enjoy the game (0-100 percentage) that they reviewed
which can lead to biases in their reviews?</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by App Name"
        />
      <button onClick={handleSearch}>Search</button>
        <table>
          <thead>
            <tr>
              <th>App ID</th> 
              <th>App Name</th>
              <th>Scaled Average Enjoyment Score</th>
              <th>Scaled Early Access Score</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.app_name}> 
                <td>{task.app_id}</td>
                <td>{task.app_name}</td>
                <td>{task.scaled_avg_enjoyment_score}</td>
                <td>{task.scaled_early_access_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
            <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
            <button onClick={handleNextPage}>Next</button>
          </div>
      </div>                
  );
};

export default Task3;