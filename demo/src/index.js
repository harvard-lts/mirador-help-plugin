import Mirador from 'mirador/dist/es/src/index';
import harvardHelp from '../../src';

const config = {
  id: 'demo',
  windows: [{
    loadedManifest: 'https://iiif.lib.harvard.edu/manifests/ids:10274486',
  }],
};

Mirador.viewer(config, [
  harvardHelp,
]);
