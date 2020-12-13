/**
 *
 * Asynchronously loads the component for Events
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
