import React, { useState, useEffect } from 'react'
import './Task6.css'

const Task6 = () => {    
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [appName, setAppName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('desc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedAppName = encodeURIComponent(appName);
        const response = await fetch(`http://localhost:5000/task6?page=${page}&sortBy=${sortBy}&appName=${appName}`);
        console.log(`Fetching data from: http://localhost:5000/task6?page=${page}&sortBy=${sortBy}&appName=${appName}`); // Log the URL
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
    <div className="Task6-Body">
      <h2>How credible an author is based on their reviews and review count (based
on written reviews ever made on Steam)?</h2>
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
          <option value="desc">Descending Author Lifetime Reviews</option>
          <option value="asc">Ascending Author Lifetime Reviews</option>
        </select>
      </div>
        <table>
          <thead>
            <tr>
              {/*Change the column names for the names of the actual column names for each specific task*/}
              <th>Author Steam ID</th> 
              <th>App Name</th>
              <th>Review</th>
              <th>Author Lifetime Review Count</th>
              <th>Votes Helpful</th>
              <th>Author Average Helpful Votes</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr>
                {/* Have the data represented here from each row for each column*/}
                <td>{task.author_steamid}</td>
                <td>{task.app_name}</td>
                <td>{task.review}</td>
                <td>{task.author_num_reviews}</td>
                <td>{task.votes_helpful}</td>
                <td>{task.avg_helpful_votes}</td>
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

export default Task6;
