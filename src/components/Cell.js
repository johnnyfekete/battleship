import classNames from 'classnames';

const Cell = ({ ship, hit, onClick }) => {
  return (
    <button type="button" className={classNames('w-8 h-8 flex rounded-sm overflow-hidden',
    'transition-all duration-300 hover:scale-110',
    'active:transition-none active:scale-110 active:translate-y-[1px]',
    {
      'bg-blue-700' : !hit,
      'outline-blue-700 outline outline-1 outline-offset-1' : !hit && ship,
      'bg-red-700': hit && ship,
      'bg-blue-900': hit && !ship
    })}
    onClick={onClick}>
      {hit && ship && (
        <div className={classNames('bg-gray-700', {
          'w-4 mx-auto': ship.direction === 'vertical',
          'h-4 my-auto': ship.direction === 'horizontal',
          'w-8': ship.direction === 'horizontal' && !ship.first && !ship.last,
          'w-6 rounded-r-sm mr-auto': ship.direction === 'horizontal' && ship.last,
          'w-6 ml-auto rounded-frontLeft': ship.direction === 'horizontal' && ship.first,
          'h-6 rounded-b-sm mb-auto mt-0': ship.direction === 'vertical' && ship.last,
          'h-6 mt-auto rounded-frontTop': ship.direction === 'vertical' && ship.first
        })}></div>
      )}
    </button>
  );
}

export default Cell;