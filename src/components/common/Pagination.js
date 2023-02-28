import { usePagination, DOTS } from '../../custom-hooks/usePagination';

const Pagination = ({
  onPageChange,
  numOfPages = 1,
  currentPage = 1,
  siblingCount = 1,
}) => {
  const paginationRange = usePagination({
    numOfPages,
    currentPage,
    siblingCount,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 1) {
    return null;
  }

  const onPrevious = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  let isOnLastPage =
    currentPage === paginationRange[paginationRange.length - 1];

  return (
    <ul className='mx-auto flex items-center space-x-2'>
      {/* Previous arrow */}
      <li
        className={`${currentPage === 1 ? 'opacity-30' : 'cursor-pointer'}`}
        onClick={onPrevious}
      >
        <p className='text-h1 font-bold'>&#8592;</p>
      </li>
      {paginationRange?.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className=''>&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <li
            key={pageNumber}
            className={`w-6 h-6 text-white text-md flex items-center justify-center cursor-pointer rounded-full hover:opacity-75 ${
              pageNumber === currentPage ? 'bg-blue' : 'bg-grey'
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            <p>{pageNumber}</p>
          </li>
        );
      })}
      {/* Next arrow */}
      <li
        className={`${isOnLastPage ? 'opacity-30' : 'cursor-pointer'}`}
        onClick={onNext}
      >
        <p className='text-h1 font-bold'>&#8594;</p>
      </li>
    </ul>
  );
};

export default Pagination;
