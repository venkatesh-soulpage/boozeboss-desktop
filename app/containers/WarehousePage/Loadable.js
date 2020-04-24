/**
 *
 * Asynchronously loads the component for Warehouse
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
