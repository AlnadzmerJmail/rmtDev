import common from './common.js';
const { state } = common;

export const BASE_URL = 'https://bytegrad.com/course-assets/js/2/api';
export const SERVER_ERROR = 'Somethin went wrong in the server!';
export const UNKNOWN_ERROR =
	'Somethin went wrong, please check your internet connection';

export const jobItem = ({
	id,
	badgeLetters,
	title,
	company,
	duration,
	salary,
	location,
	daysAgo,
}) => {
	const { activeJobItem, bookmarksJobItems } = state;

	// check if job has already bookmarked
	const isBookmarked = () => {
		return bookmarksJobItems.some((bookmarked) => bookmarked.id === id)
			? 'job-item__bookmark-icon--bookmarked'
			: '';
	};

	return `
    <li class="job-item ${activeJobItem?.id === id ? 'job-item--active' : ''}">
        <a class="job-item__link" href='${id}'>
            <div class="job-item__badge">${badgeLetters}</div>
            <div class="job-item__middle">
                <h3 class="third-heading">${title}</h3>
                <p class="job-item__company">${company}</p>
                <div class="job-item__extras">
                    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${duration}</p>
                    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${salary}</p>
                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${location}</p>
                </div>
            </div>
            <div class="job-item__right">
                <i class="fa-solid fa-bookmark job-item__bookmark-icon ${isBookmarked()}"></i>
                <time class="job-item__time">${daysAgo}d</time>
            </div>
        </a>
    </li>
    `;
};

export const jobDetails = ({
	id,
	badgeLetters,
	title,
	company,
	duration,
	salary,
	location,
	daysAgo,
	description,
	companyURL,
	coverImgURL,
	qualifications = [],
	reviews = [],
}) => {
	// check if job has already bookmarked
	const isBookmarked = () => {
		return state.bookmarksJobItems.some((bookmarked) => bookmarked.id === id)
			? 'job-info__bookmark-icon--bookmarked'
			: '';
	};

	return `
    <img src="${coverImgURL}" alt="#" class="job-details__cover-img">

    <a class="apply-btn" href="${companyURL}" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>

    <section class="job-info">
        <div class="job-info__left">
            <div class="job-info__badge">${badgeLetters}</div>
            <div class="job-info__below-badge">
                <time class="job-info__time">${daysAgo}d</time>
                <button class="job-info__bookmark-btn">
                    <i class="fa-solid fa-bookmark job-info__bookmark-icon ${isBookmarked()}"></i>
                </button>
            </div>
        </div>
        <div class="job-info__right">
            <h2 class="second-heading">${title}</h2>
            <p class="job-info__company">${company}</p>
            <p class="job-info__description">${description}</p>
            <div class="job-info__extras">
                <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i>${duration}</p>
                <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i>${salary}</p>
                <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i>${location}</p>
            </div>
        </div>
    </section>

    <div class="job-details__other">
        <section class="qualifications">
            <div class="qualifications__left">
                <h4 class="fourth-heading">Qualifications</h4>
                <p class="qualifications__sub-text">Other qualifications may apply</p>
            </div>
            <ul class="qualifications__list">
                ${qualifications
									.map((q) => `<li class="qualifications__item">${q}</li>`)
									.join('')}
            </ul>
        </section>

        <section class="reviews">
            <div class="reviews__left">
                <h4 class="fourth-heading">Company reviews</h4>
                <p class="reviews__sub-text">Recent things people are saying</p>
            </div>
            <ul class="reviews__list">
                ${reviews
									.map((review) => `<li class="reviews__item">${review}</li>`)
									.join('')}
            </ul>
        </section>
    </div>

    <footer class="job-details__footer">
        <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
    </footer>
    `;
};
