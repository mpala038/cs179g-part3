import React, { useState, useEffect } from 'react';
import './Task5.css'

const Task5 = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [appName, setAppName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('desc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedAppName = encodeURIComponent(appName);
        const response = await fetch(`http://localhost:5000/task5?page=${page}&sortBy=${sortBy}&appName=${appName}`);
        console.log(`Fetching data from: http://localhost:5000/task5?page=${page}&sortBy=${sortBy}&appName=${appName}`); // Log the URL
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [page, appName, sortBy]); // Refetch data when the page changes

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

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  return (
    <div className="Task5-Body">
      <h2>How popular or relevant is a game based on the reviews it
gets over time?</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search by App Name"
      />
      <button onClick={handleSearch}>Search</button>
      <div className="sort-options">
        <label htmlFor="sort-by">Sort By:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="desc">Descending Popularity Score</option>
          <option value="asc">Ascending Popularity Score</option>
        </select>
      </div>
        <table>
          <thead>
            <tr>
              <th>App ID</th>
              <th>App Name</th>
              <th>Total Review Count</th>
              <th>Earliest Review Date</th>
              <th>Latest Review Date</th>
              <th>Popularity Score</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.app_id}</td>
                <td>{task.app_name}</td>
                <td>{task.total_rev_count}</td>
                <td>{task.earliest_review_date}</td>
                <td>{task.latest_review_date}</td>
                <td>{task.popularity_score}</td>
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

export default Task5;