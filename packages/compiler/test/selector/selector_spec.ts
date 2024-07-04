/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {shim, shim2} from './utils';

describe('ShadowCss, keyframes and animations', () => {
  it('should handle (scope or not) host and content attributes and component variable as selector', () => {
    const COMPONENT_VARIABLE = '%COMP%';
    const COMPONENT_REGEX = /%COMP%/g;
    const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
    const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
    const css = `.test {
      animation:my-anim 1s,my-anim2 2s, my-anim3 3s,my-anim4 4s;
    }
    
    @keyframes my-anim {
      0% {color: red}
      100% {color: blue}
    }
    
    @keyframes my-anim2 {
      0% {font-size: 1em}
      100% {font-size: 1.2em}
    }
    `;
    const result = shim(css, CONTENT_ATTR, HOST_ATTR);
    ['my-anim'].forEach((scoped) => expect(result).toContain(`_ngcontent-%COMP%_${scoped}`));
    ['my-anim3', 'my-anim4'].forEach((nonScoped) => {
      expect(result).toContain(nonScoped);
      expect(result).not.toContain(`${nonScoped}`);
    });
  });
});
