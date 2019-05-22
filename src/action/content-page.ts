import { action, observable } from "mobx";

class HomeStore {
  @observable text;
  @observable number;

  constructor() {
    this.text = "hello mobx-react";
    this.number = 0;
  }

  @action minus = () => {
    setTimeout(() => (this.number = --this.number), 2000);
  };

  @action plus = () => {
    this.number = ++this.number;
  };
}

const homeStore = new HomeStore();

export { homeStore };
export default homeStore;
