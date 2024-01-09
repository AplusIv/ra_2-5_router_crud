// import logo from './logo.svg';
import './App.css';
import {NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import Button from './components/Button';

import useJsonFetch from "./hooks/useJsonFetch";
import { useState } from 'react';
import PostDetails from './components/PostDetails';
import Page404 from './components/Page404';
// import EditPost from './components/EditPost';
// import EditPostContext from './context/EditPostContext';



function App() {
  // const url = 'http://localhost:7070';
  const url = 'https://router-crud-backend-eixl.onrender.com';
  const opts = ['/posts', '/posts/new'];  
  
  const [data] = useJsonFetch(url, opts[0], 'GET');
  // const [data, loading, error] = useJsonFetch(url, opts[1], 'POST');

  const navigate = useNavigate();


  const [noteState, setNoteState] = useState({
    id: '',
    content: '',
  });
  
  
  // const [needDataLoading, setNeedDataLoading] = useState(false); // Необходимость запуска эффекта

  const sendNote = async (noteState) => {
    try {
      let response = await fetch(url + opts[0], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteState)
      });
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
    // setNeedDataLoading(true); // меняю состояние needDataLoading, заставляю отработать useEffect
  }

  const handleChange = (event) => {
    const {value} = event.target;
    console.log(event.target);
    setNoteState((prevNoteStateValue) => ({...prevNoteStateValue, content: value, id: 0}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    sendNote(noteState); // отправка новых данных на сервер

    // setNeedDataLoading(true); // меняю состояние needDataLoading, заставляю отработать useEffect

    // Очистка textarea
    setNoteState((prevNoteStateValue) => ({...prevNoteStateValue, content: '', id: ''}));
    navigate('/', {replace: true});
  }

  const handleClick = () => {
    // deleteNote(id);
    console.log('Закроем');
    navigate('/', {replace: true});
    // setNeedDataLoading(true); // меняю состояние needDataLoading, заставляю отработать useEffect
  }

  // const refreshNotes = () => {
  //   setNeedDataLoading(true); // меняю состояние needDataLoading, заставляю отработать useEffect
  // }

  const commonProps = {
    postState: noteState,
    setPostState: setNoteState,
    onChange: handleChange,
    onClick: handleChange,
    onSubmit: handleSubmit,
    onDelete: handleDelete
  }
  console.log(commonProps);

  return (
    <>
      <NavLink to="/"><Button>Посты</Button></NavLink>
      <NavLink to="/posts/new"><Button>Создать пост</Button></NavLink>

      <Routes>
        {data && <Route path='/' element={<Posts posts={data}/>}/>}
        <Route path='/posts/new' element={<NewPost state={noteState} onChange={handleChange} onSubmit={handleSubmit} onClick={handleClick}/>}/>
        {/* <Route path='/posts/:parId' element={<PostDetails onClick={handleClick} onDelete={handleDelete}/>}/> */}
        <Route path='/posts/:parId' element={<PostDetails commonProps={commonProps}/>}/>
        <Route path='*' element={<Page404/>}></Route>
      </Routes>

      {/* <EditPostContext.Provider value={{noteState, setNoteState, handleChange, handleClick, handleSubmit}}>
      </EditPostContext.Provider> */}
      {/* <Posts/> */}
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
