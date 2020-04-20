/**
 *
 * Asynchronously loads the component for System
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
