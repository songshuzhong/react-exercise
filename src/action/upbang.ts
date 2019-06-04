import { inject } from '../widget/inject-decorator';
import { UpbangStore } from '../store/upbang';

export class UpbangAction {
    @inject('UpbangStore') store: UpbangStore;
}
