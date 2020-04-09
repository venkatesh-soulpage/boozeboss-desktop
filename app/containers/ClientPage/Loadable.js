/**
 *
 * Asynchronously loads the component for ClientContainer
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
