// elements

import {
	SERVER_ERROR,

	// html element
	jobItem,
	jobDetails,
} from '../constant.js';

import common from '../common.js';
const {
	state,
	// error
	errorTextEl,
	errorEl,
	// spinner
	spinnerSearchEl,
	spinnerJobDetailsEl,
	// fetch
	numberEl,
	jobListBookmarksEl,
	jobListSearchEl,
	jobDetailsContentEl,
} = common;
// ------------------------------END IMPORTS------------------------------

// render each job item to search items section
export const renderJobItem = (isBookmark = false) => {
	const { jobItems, bookmarksJobItems, currentPage, perPage } = state;

	// number of search results
	numberEl.textContent = jobItems.length;

	// determine where to render: search result or bookmarks
	const jobListEl = isBookmark ? jobListBookmarksEl : jobListSearchEl;

	// clear job search or bookmarks -- because there is already rendered it needs to be cleared
	jobListEl.innerHTML = '';

	// controls the job item to render in search job list
	const offset = (currentPage - 1) * perPage;

	const jobs = isBookmark
		? bookmarksJobItems
		: jobItems.slice(offset, currentPage * perPage);

	jobs.forEach((job) => {
		jobListEl.insertAdjacentHTML('beforeend', jobItem(job));
	});
};

// render the job details
export const renderJobDetails = () => {
	const { jobItemDetails } = state;

	// hide spinner
	renderSpinner('details');

	jobDetailsContentEl.innerHTML = jobDetails(jobItemDetails);
};

export const renderError = (msg) => {
	errorTextEl.textContent = msg;
	errorEl.classList.add('error--visible');

	setTimeout(() => {
		errorEl.classList.remove('error--visible');
	}, 3500);
};

export const renderSpinner = (key) => {
	const spinner = key === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
	spinner.classList.toggle('spinner--visible');
};

export const getData = async (url) => {
	const response = await fetch(url);

	if (!response.ok) throw new Error(SERVER_ERROR);

	return await response.json();
};
