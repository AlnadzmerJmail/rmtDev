import { renderJobItem } from '../helper/index.js';

import common from '../common.js';
const { state } = common;

state.bookmarksJobItems = JSON.parse(
	localStorage.getItem('bookmarkJobItems') || '[]'
);

// render the stored jobItems
renderJobItem('bookmark');
