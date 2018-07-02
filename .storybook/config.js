import { configure } from '@storybook/react';

function loadStories() {
  require('../Notifier/stories.js');
}

configure(loadStories, module);
