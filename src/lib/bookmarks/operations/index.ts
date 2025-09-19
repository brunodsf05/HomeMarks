import * as chrome from './chrome';
import * as firefox from './firefox';

export const ops = __BROWSER__ === 'chrome' ? chrome : firefox;
