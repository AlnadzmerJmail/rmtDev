import { renderJobItem } from '../helper/index.js';
import common from '../common.js';
const {
	state,
	paginationEl,
	paginationNumberNextEl,
	paginationNumberBackEl,
	paginationBtnNextEl,
	paginationBtnBackEl,
} = common;

const hiddenClassName = 'pagination__button--hidden';

const clickHandler = (e) => {
	const paginateBtnEl = e.target.closest('.pagination__button');

	let { currentPage, perPage, jobItems } = state;

	if (!paginateBtnEl) return;

	if (paginateBtnEl.className.includes('--next')) {
		currentPage += 1;

		// show prev page button
		paginationBtnBackEl.classList.remove(hiddenClassName);

		// hide next button when last part of data has reached
		if (perPage * currentPage >= jobItems.length)
			paginationBtnNextEl.classList.add(hiddenClassName);
	} else {
		// do not make page < 1
		if (currentPage > 1) {
			currentPage -= 1;
		}

		// show next page button
		paginationBtnNextEl.classList.remove(hiddenClassName);

		// hide pprev button when on page 1
		if (currentPage === 1) paginationBtnBackEl.classList.add(hiddenClassName);
	}

	// change page number content
	paginationNumberNextEl.textContent = currentPage + 1;
	paginationNumberBackEl.textContent = currentPage;

	// update state
	state.currentPage = currentPage;

	// render current page
	renderJobItem();
};

paginationEl.addEventListener('click', clickHandler);
