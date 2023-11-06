import {
	renderJobItem,
	renderError,
	renderSpinner,
	getData,
} from '../helper/index.js';
import { BASE_URL, UNKNOWN_ERROR } from '../constant.js';

import common from '../common.js';
const { state, searchFormEl, searchInputEl, jobListSearchEl } = common;

// Note: This days the submit functinality is no longer put on form action, instead it is implemented manualy by js

const submitHandler = async (e) => {
	e.preventDefault();

	const searchText = searchInputEl.value;

	// validation with regex
	const forbiddenPattern = /python/;
	const patternMatch = forbiddenPattern.test(searchText);

	if (patternMatch) {
		const errMessage = 'Your search may not contain Python';
		return renderError(errMessage);
	}

	searchInputEl.blur();

	// clear job search -- because there is already rendered it needs to be cleared
	jobListSearchEl.innerHTML = '';

	renderSpinner('search');

	try {
		const { jobItems = [] } = await getData(
			`${BASE_URL}/jobs?search=${searchText}`
		);
		// assigning to state
		state.jobItems = jobItems;

		// render to search items section
		renderJobItem();
	} catch (err) {
		return renderError(err.message || UNKNOWN_ERROR);
	}

	renderSpinner('search');
};
searchFormEl.addEventListener('submit', submitHandler);
