import React, { useState, useRef, useCallback } from 'react';
import useStudentSearch from './components/useStudentSearch';

function App() {
  const [page, setPage] = useState(1);

  const { loading, error, studentList, hasMore } = useStudentSearch(page);
  const observer = useRef();
  const lastLoadedStd = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <div style={{ marginRight: '20px', marginLeft: '20px' }}>
      <table className='table table-responsive caption-top'>
        <caption>
          <h1>List of Students:</h1>
        </caption>
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
        </thead>
        <tbody>
          {studentList.map((std, index) => {
            if (index + 1 === studentList.length) {
              return (
                <tr ref={lastLoadedStd} key={std.id}>
                  <th>{std.id}</th>
                  <td>{std.FullName}</td>
                  <td>{std.Email}</td>
                </tr>
              );
            } else {
              return (
                <tr key={std.id}>
                  <th>{std.id}</th>
                  <td>{std.FullName}</td>
                  <td>{std.Email}</td>
                </tr>
              );
            }
          })}
        </tbody>
        <tfoot>
          <th className='text text-danger'>{loading && 'Loading more...'}</th>
        </tfoot>
      </table>
      <div
        className='text text-danger btn-dark'
        style={{ marginBottom: '20px' }}
      >
        <center>{error && 'Server Error Occured!'}</center>
      </div>
    </div>
  );
}

export default App;
