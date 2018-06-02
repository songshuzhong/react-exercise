import React from 'react';
import { render } from 'react-dom';

import TodoList from './components/todoList';
import TodoListModel from './models/todoList';

const store = new TodoListModel();

render(
  <TodoList store={ store } />,
  document.getElementById( 'root' )
);

store.addTodo( 'number one' );
store.addTodo( 'number two' );

setTimeout( () => { store.addTodo( 'number three async' ) }, 2000 );

window.store = store;
