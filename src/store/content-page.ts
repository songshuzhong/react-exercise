import { observable } from "mobx";

export class ContentPage {
  @observable fetching: boolean = false;
  @observable error: boolean = false;
  @observable count: number = 1;
  @observable activeTab: string = "0";
  @observable notice: boolean = false;
  @observable noticeMsg: string = "";
  @observable noNetwork: boolean = false;
  @observable hasMoreContent: boolean = true;
  @observable contentList: any[] = [];
}
