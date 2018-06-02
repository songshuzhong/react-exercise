import { observable } from 'mobx';

export default class TodoModel {
  key = Math.random();
  @observable finished = false;
  @observable title;

  constructor( title ) {
    this.title = title;
  }
}