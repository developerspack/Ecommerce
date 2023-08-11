import { useState } from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;

  // useState
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // paginate
  const Paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // go to next page
  const NextPage = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // go to prev page
  const PrevPage = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="my-4 float-right">
      <ul className="inline-flex -space-x-px items-center">
        {/* prev */}
        <li
          className="px-3 py-2 ml-0 leading-tight rounded-l-lg cursor-pointer bg-dark text-gray-400 border border-gray-700 hover:bg-lightDark"
          onClick={PrevPage}
        >
          Prev
        </li>
        {pageNumbers.map((number) => {
          if (number < maxPageNumberLimit && number > minPageNumberLimit) {
            return (
              <li
                key={number}
                onClick={() => Paginate(number)}
                className="px-3 leading-tight py-2 cursor-pointer bg-dark text-gray-400 border border-gray-700 hover:bg-lightDark"
              >
                {number}
              </li>
            );
          }
        })}
        {/* next */}
        <li
          className="px-3 py-2 ml-0 leading-tight rounded-r-lg cursor-pointer bg-dark text-gray-400 border border-gray-700 hover:bg-lightDark"
          onClick={NextPage}
        >
          Next
        </li>
        {/* page of: */}
        <p className="pl-4 space-x-1">
          <span>Page</span>
          <span className="text-primary">{`${currentPage}`}</span>
          <span>of</span>
          <span>{`${Math.ceil(totalPages)}`}</span>
        </p>
      </ul>
    </div>
  );
};

export default Pagination;
