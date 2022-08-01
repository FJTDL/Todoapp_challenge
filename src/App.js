// IMPORTS ALL FILES AND REACT AND CSS

import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import User from './components/User';
import Projects from './components/Projects';
import Calendar from './components/Calendar';
import AddNewTodo from './components/AddNewTodo';
import Todos from './components/Todos';

// MAIN CONTAIN RETURNS ALL COMPONENTS
function App() {
  return (
    <div className='App'>
      <Sidebar>
        <User />
        <AddNewTodo />
        <Calendar />
        <Projects />
      </Sidebar>
      <Main>
        <Todos />
      </Main>
    </div>
  );
}

// EXPORTS APP
export default App;
