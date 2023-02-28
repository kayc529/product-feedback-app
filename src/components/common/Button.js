import { ButtonColors } from '../../data/colors';
const Button = ({
  text,
  color = ButtonColors.BLUE,
  callback,
  isDisabled = false,
}) => {
  return (
    <button
      className={`h-button text-sm font-bold text-white px-4 py-2 ${color} rounded-button hover:opacity-75 md:text-h4 md:px-6 md:py-3 disabled:opacity-50`}
      onClick={callback}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
