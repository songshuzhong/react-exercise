import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import Todo from './todo';
import ErrorBoundary from './boundary';

@observer
class TodoList extends Component {
  @observable title = '';

  @action
  handleChange = ( e ) => {
    this.title = e.target.value;
  };

  @action
  handleAddTodo = ( e ) => {
    this.props.store.addTodo( this.title );
    this.title = '';
    e.preventDefault();
  };

  render() {
    return(
      <ErrorBoundary>
        <form onSubmit={ this.handleAddTodo }>
          <input type='text' onChange={ this.handleChange } />
          <button type='submit'>add</button>
        </form>
        <hr/>
        <ul>
          {
            this.props.store.todoList.map( todo => <Todo key={ todo.key } todo={ todo } /> )
          }
        </ul>
        total finished: { this.props.store.hasFinished }
      </ErrorBoundary>
    );
  }
}

export default TodoList;