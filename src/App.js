import './App.css';
import {NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import Button from './components/Button';

import { useEffect, useState } from 'react';
import PostDetails from './components/PostDetails';
import Page404 from './components/Page404';


function App() {
  const url = 'https://router-crud-backend-eixl.onrender.com';
  
  const [needDataLoading, setNeedDataLoading] = useState(false); // Необходимость запуска эффекта

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(url + '/posts', {
            signal: abortController.signal
          });       
        if (!res.ok) {
          setLoading(false);
          const data = await res.json();
          console.log(data);
          setError({
            text: data.status,
            status: res.status
          });
          console.log(error);
          console.log(res);          
          throw new Error('Запрос неудачный, статус '+res.status);
        }
        const data = await res.json();
        console.log(data);
        setData(data);
        setLoading(false);

        setNeedDataLoading(false);    
      } catch (error) {
        // setLoading(false);
        // setError(null);
        console.log(error);
      }
    }

    console.log('Отработал эффект с fetchData()');
    setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      console.log('cleanup');
      return abortController.abort();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needDataLoading])


  const navigate = useNavigate();

  const [noteState, setNoteState] = useState({
    id: '',
    content: '',
  });
  
  
  const sendPostData = async (state, method, id = '') => {
    try {
      let response;
      if (method === 'POST') {
        response = await fetch(url + '/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state)
        });  
      } else if (method === 'PUT') {
        response = await fetch(url + '/posts/' + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state)
        });
      }
      if (!response.ok) { 
        alert("Ошибка HTTP: " + response.status);
      } else {
        // let result = await response.json();
        console.log('post\'s added');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    sendPostData(noteState, 'POST'); // отправка новых данных на сервер

    setNeedDataLoading(true); // меняю состояние needDataLoading, заставляю отработать useEffect

    // Очистка textarea
    setNoteState((prevNoteStateValue) => ({...prevNoteStateValue, content: '', id: ''}));
    navigate('/', {replace: true});
  }

  const deleteNote = async (id) => {
    try {
      let response = await fetch(url + '/posts/' + id, {
        method: 'DELETE',
      });
      if (!response.ok) { 
        alert("Ошибка HTTP: " + response.status);
      } else {
        // await response.json();
        console.log('post\'s deleted');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = (id) => {
    deleteNote(id);
    console.log('Закроем и удалим');
    navigate('/', {replace: true});
    setNeedDataLoading(true); // меняю состояние needDataLoading, заставляю отработать useEffect
  }

  const handleChange = (event) => {
    const {value} = event.target;
    console.log(event.target);
    setNoteState((prevNoteStateValue) => ({...prevNoteStateValue, content: value, id: 0}))
  }

  const handleClick = () => {
    console.log('Закроем');
    navigate('/', {replace: true});
    setNeedDataLoading(true); // меняю состояние needDataLoading, заставляю отработать useEffect
  }

  const commonProps = {
    postState: noteState,
    setPostState: setNoteState,
    onChange: handleChange,
    onClick: handleChange,
    sendPostData: sendPostData,
    onDelete: handleDelete,
    setNeedDataLoading: setNeedDataLoading,
  }
  console.log(commonProps);

  return (
    <>
      <NavLink to="/"><Button type='btn-outline-primary' >Посты</Button></NavLink>
      <NavLink to="/posts/new"><Button type='btn-outline-primary'>Создать пост</Button></NavLink>

      {!data && <div>Loading...</div>}

      <Routes>
        {data && <Route path='/' element={<Posts posts={data}/>}/>}
        <Route path='/posts/new' element={<NewPost state={noteState} onChange={handleChange} onSubmit={handleSubmit} onClick={handleClick}/>}/>
        <Route path='/posts/:parId' element={<PostDetails commonProps={commonProps}/>}/>
        {!loading && <Route path='*' element={<Page404/>}></Route>}
      </Routes>
    </>
  );
}

export default App;
