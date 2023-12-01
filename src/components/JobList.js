import {
	renderJobDetails,
	renderSpinner,
	renderError,
	getData,
} from '../helper/index.js';
import { BASE_URL, UNKNOWN_ERROR } from '../constant.js';

import common from '../common.js';
const { state, jobListSearchEl, jobDetailsContentEl, jobListBookmarksEl } =
	common;

const clickHandler = async (e) => {
	e.preventDefault();

	// get clicked job item element
	const jobItemEl = e.target.closest('.job-item');

	// remove active class from previous
	document.querySelectorAll('.job-item--active').forEach((activeJob) => {
		activeJob.classList.remove('job-item--active');
	});

	// add active class to currently selected
	jobItemEl.classList.add('job-item--active');

	// clear job details section -- because when there is already rendered it needs to be cleared
	jobDetailsContentEl.innerHTML = '';

	// show spinner
	renderSpinner('details');

	const jobId = jobItemEl.children[0].getAttribute('href');

	// update sate's activeJob
	const allJobItems = [...state.jobItems, ...state.bookmarksJobItems];

	state.activeJobItem = allJobItems.find(({ id }) => id === +jobId);

	// add id to url -- so that you can share the same page to other user
	let { pathname } = location;
	pathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

	history.pushState(null, '', `${pathname}/#${jobId}`);

	try {
		const { jobItem } = await getData(`${BASE_URL}/jobs/${jobId}`);

		// assigning to state
		state.jobItemDetails = jobItem;

		// render to job details section
		renderJobDetails();
	} catch (err) {
		renderError(err.message || UNKNOWN_ERROR);
		// hide spinner
		renderSpinner('details');
	}
};
jobListSearchEl.addEventListener('click', clickHandler);
jobListBookmarksEl.addEventListener('click', clickHandler);
