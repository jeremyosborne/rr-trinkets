import { configure } from '@storybook/react';

configure(function() {
  const req = require.context('../src', true, /stories\.jsx?$/)
  req.keys().forEach(req)
}, module);
