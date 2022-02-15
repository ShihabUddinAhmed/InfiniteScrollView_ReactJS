import axios from 'axios';
import React, { useState, useEffect } from 'react';

const useStudentSearch = (page) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/Student-List',
      params: { pageNumber: page },
    })
      .then((res) => {
        setStudentList((prevStudentList) => {
          return [...prevStudentList, ...res.data.students];
        });
        setHasMore(res.data.students.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  }, [page]);
  return { loading, error, studentList, hasMore };
};

export default useStudentSearch;
