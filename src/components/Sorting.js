import { renderJobItem, getData } from '../helper/index.js';

import common from '../common.js';
const {
	state,
	sortingEl,
	sortingBtnRelevantEl,
	sortingBtnRecentEl,
	jobListSearchEl,
} = common;

const clickHandler = async (e) => {
	const clickBtnEl = e.target.closest('.sorting__button');

	if (!clickBtnEl) return;

	const recent = clickBtnEl.className.includes('--recent') ? true : false;
	let sorted;

	const className = 'sorting__button--active';
	if (recent) {
		sortingBtnRecentEl.classList.add(className);
		sortingBtnRelevantEl.classList.remove(className);

		sorted = state.jobItems.toSorted((a, b) => a.daysAgo - b.daysAgo);
	} else {
		sortingBtnRelevantEl.classList.add(className);
		sortingBtnRecentEl.classList.remove(className);

		sorted = state.jobItems.toSorted(
			(a, b) => b.relevanceScore - a.relevanceScore
		);
	}

	// change state jobItems TO its sorted version
	state.jobItems = sorted;

	// clear job search -- because when there is already rendered it needs to be cleared
	jobListSearchEl.innerHTML = '';

	renderJobItem();
};

sortingEl.addEventListener('click', clickHandler);
