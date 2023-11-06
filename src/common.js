const queryDocument = (selector) => document.querySelector(selector);

const state = {
	jobItems: [],
	bookmarksJobItems: [],
	jobItemDetails: null,
	activeJobItem: null,
	currentPage: 1,
	perPage: 7,
};
// I used this instead of prefixing "export" keywprd to all of these varibales
export default {
	state,
	bookmarksBtnEl: queryDocument('.bookmarks-btn'),
	errorEl: queryDocument('.error'),
	errorTextEl: queryDocument('.error__text'),
	jobDetailsEl: queryDocument('.job-details'),
	jobDetailsContentEl: queryDocument('.job-details__content'),
	jobListBookmarksEl: queryDocument('.job-list--bookmarks'),
	jobListSearchEl: queryDocument('.job-list--search'),
	numberEl: queryDocument('.count__number'),
	paginationEl: queryDocument('.pagination'),
	paginationBtnNextEl: queryDocument('.pagination__button--next'),
	paginationBtnBackEl: queryDocument('.pagination__button--back'),
	paginationNumberNextEl: queryDocument('.pagination__number--next'),
	paginationNumberBackEl: queryDocument('.pagination__number--back'),
	searchFormEl: queryDocument('.search'),
	searchInputEl: queryDocument('.search__input'),
	sortingEl: queryDocument('.sorting'),
	sortingBtnRelevantEl: queryDocument('.sorting__button--relevant'),
	sortingBtnRecentEl: queryDocument('.sorting__button--recent'),
	spinnerSearchEl: queryDocument('.spinner--search'),
	spinnerJobDetailsEl: queryDocument('.spinner--job-details'),
};
