import { observable, action } from 'mobx';

class HomeStore {
  @observable text;
  @observable number;

  constructor() {
    this.text = 'hello mobx-react';
    this.number = 0;
  }

  @action
  minus() {
    this.number = --this.number;
  }

  @action
  plus() {
    this.number = ++this.number;
  }
}

const homeStore = new HomeStore();
export default homeStore;