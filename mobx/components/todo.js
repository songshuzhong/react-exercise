import React from 'react';
import { observer } from 'mobx-react';

const Todo = observer( ( { todo } ) => {
  if ( todo.title === 'song' ) {
    throw new Error( 'sorry, song is a bug.....................' );
  }

  return (
    <li key={ todo.key }>
      <input type='checkbox' onClick={ () => { todo.finished = !todo.finished } } />
      { todo.title }
    </li>
  );
} );

export default Todo;
