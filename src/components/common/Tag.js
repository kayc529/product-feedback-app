const Tag = ({
  keyword,
  onClick,
  withMargin = true,
  clickable = false,
  selected = false,
}) => {
  const getColor = () => {
    if (selected) {
      return 'bg-blue cursor-pointer';
    } else {
      return `bg-lightGrey2${
        clickable ? ' cursor-pointer hover:bg-lightGrey1' : ''
      }`;
    }
  };

  return (
    <div
      className={`h-tag ${getColor()} mr-2 ${
        withMargin ? 'mb-4' : ''
      } rounded-tag`}
      onClick={() => onClick(keyword)}
    >
      <p
        className={`${
          selected ? 'text-white' : 'text-blue'
        } text-sm text-center font-semibold capitalize py-1 px-4 max-w-[210px] text-ellipsis overflow-hidden`}
      >
        {keyword}
      </p>
    </div>
  );
};

export default Tag;
