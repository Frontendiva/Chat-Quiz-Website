import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './redux/actions';

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data.data);
  const loading = useSelector(state => state.data.loading);
  const error = useSelector(state => state.data.error);

  useEffect(() => {
    dispatch(actions.fetchDataRequest());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
