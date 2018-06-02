import { observable, computed, action } from 'mobx';

import TodoModel from './todo';

export default class TodoList {
  @observable todoList = [];

  @computed
  get hasFinished() {
    return this.todoList.filter( todo => !todo.finished ).length;
  }

  @action
  addTodo( title ) {
    this.todoList.push( new TodoModel( title ) );
  }
}