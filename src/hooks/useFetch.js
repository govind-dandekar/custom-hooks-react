import { useEffect, useState } from 'react';

// fx that start with "use" are treated as hooks by React
export function useFetch(fetchFn, initialValue){

  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  // can use other hooks inside fx
	useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, 
  // if fetchFn fx changes, hook should run again 
  // with updated fetchFn fx
  [fetchFn]);

  // return state by grouping it into an array or obj
  return {
    isFetching,
    setIsFetching,
    fetchedData,
    setFetchedData,
    error,
    setError
  }
}