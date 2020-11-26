import React from 'react';

const Pagination = ({ currentPageNumber, numberOfPages, changePageNumber }) => {
	const pageNumbers = [];
	for (let i = 1; i <= numberOfPages; i++) pageNumbers.push(i);
	const getClassNameIfActive = (number) => {
		return number === currentPageNumber ? 'active' : '';
	};
	return (
		<nav>
			<ul className="pagination">
				{pageNumbers.map((number) => (
					<li
						key={number}
						className={`page-item ${getClassNameIfActive(number)}`}
					>
						<button
							onClick={() => changePageNumber(number)}
							className="page-link"
						>
							{number}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
