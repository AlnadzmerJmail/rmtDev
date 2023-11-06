import { BASE_URL, UNKNOWN_ERROR } from '../constant.js';
import {
	renderJobDetails,
	renderError,
	renderSpinner,
	getData,
} from '../helper/index.js';
import common from '../common.js';
const { state, jobDetailsContentEl } = common;

const loadHandler = async () => {
	const jobId = window.location.hash.substring(1);
	if (!jobId) return;

	// remove previous job details content
	jobDetailsContentEl.innerHTML = '';

	// show spinner
	renderSpinner('details');

	try {
		const { jobItem } = await getData(`${BASE_URL}/jobs/${jobId}`);

		// assigning to state
		state.jobItemDetails = jobItem;
		state.activeJobItem = jobItem;

		// remove active class from previously selected
		document.querySelectorAll('.job-item--active').forEach((activeJob) => {
			activeJob.classList.remove('job-item--active');
		});

		// add active class to currently selected
		document.querySelectorAll('.job-item').forEach((jobItemEl) => {
			const linkEl = jobItemEl.querySelector('.job-item__link');

			if (linkEl && +linkEl.getAttribute('href') === jobItem.id) {
				jobItemEl.classList.add('job-item--active');
			}
		});

		// render to job details section
		renderJobDetails();
	} catch (err) {
		renderError(err.message || UNKNOWN_ERROR);

		// hide spinner
		renderSpinner('details');
	}
};

window.addEventListener('DOMContentLoaded', loadHandler);
window.addEventListener('hashchange', loadHandler); // -- handles browser's arrow button
