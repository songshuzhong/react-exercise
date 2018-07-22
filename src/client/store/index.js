import { createStore } from 'redux';

import reducers from './reducers';

const index = createStore( reducers );

export default index;