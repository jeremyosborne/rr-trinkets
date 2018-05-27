import { configure } from '@storybook/react';

function loadStories() {
  require('../index.stories.js');
}

configure(loadStories, module);
