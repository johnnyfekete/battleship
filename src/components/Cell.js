import classNames from 'classnames';

const Cell = ({ ship, hit, onClick }) => {
  return (
    <button type="button" className={classNames('w-8 h-8 rounded-sm', {
      'bg-blue-700' : !hit,
      'outline-blue-700 outline outline-1 outline-offset-1' : !hit && ship,
      'bg-red-700': hit && ship,
      'bg-blue-900': hit && !ship
    })}
    onClick={onClick}>
    </button>
  );
}

export default Cell;