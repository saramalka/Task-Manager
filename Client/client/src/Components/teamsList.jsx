
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../slices/dataSlice';

export default function TeamsList() {
//   const dispatch = useDispatch();
//   const { data, status, error } = useSelector((state) => state.data);

//   useEffect(() => {
//     dispatch(fetchData());
//   }, [dispatch]);

//   if (status === 'loading') return <div>Loading...</div>;
//   if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      {/* <h1>Message from server:</h1>
      <p>{data?.message}</p> */}
    </div>
  );
}


