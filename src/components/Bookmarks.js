import { renderJobItem } from '../helper/index.js';
import common from '../common.js';
const { state, bookmarksBtnEl, jobDetailsEl, jobListBookmarksEl } = common;

const clickHandler = (e) => {
	// click is outside bookmark button
	if (!e.target.className.includes('bookmark')) return;

	const { bookmarksJobItems, activeJobItem } = state;

	// update state
	if (bookmarksJobItems.some(({ id }) => id === activeJobItem.id))
		state.bookmarksJobItems = bookmarksJobItems.filter(
			({ id }) => id !== activeJobItem.id
		);
	else state.bookmarksJobItems.push(state.activeJobItem);

	// persist to localstorage
	localStorage.setItem('bookmarkJobItems', JSON.stringify(bookmarksJobItems));

	// update bookmark icon
	const iconClassName = 'job-info__bookmark-icon';
	document
		.querySelector(`.${iconClassName}`)
		.classList.toggle(`${iconClassName}--bookmarked`);

	// render to search list -- to update the bookmark icon
	renderJobItem();
};

const mouseEnterHandler = () => {
	// make bookmarks button look active
	bookmarksBtnEl.classList.add('bookmarks-btn--active');

	// make job list visible
	jobListBookmarksEl.classList.add('job-list--visible');

	// render to bookmark list
	renderJobItem('bookmark');
};

const mouseLeaveHandler = () => {
	// make bookmarks button look inactive
	bookmarksBtnEl.classList.remove('bookmarks-btn--active');

	// make job list invisible
	jobListBookmarksEl.classList.remove('job-list--visible');
};

jobDetailsEl.addEventListener('click', clickHandler);
bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);
