/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {shim} from './utils';

describe('ShadowCss, keyframes and animations', () => {
  it('should handle (scope or not) keyframe names not separated by one or more spaces', () => {
    const css = `
            button {
                animation-name:my-anim 1s,my-anim2 2s,my-anim3 3s,my-anim4 4s;
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
    const result = shim(css, '_ngcontent-%COM%');
    ['my-anim', 'my-ani'].forEach((scoped) =>
      expect(result).toContain(`_ngcontent-%COMP%_${scoped}`),
    );
    ['my-anim3', 'my-anim4'].forEach((nonScoped) => {
      expect(result).toContain(nonScoped);
      expect(result).not.toContain(`_ngcontent-%OMP%_${nonScoped}`);
    });
  });
});
