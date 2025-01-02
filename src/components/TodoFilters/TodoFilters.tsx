import s from './TodoFilters.module.scss'

// @ts-ignore
const TodoFilters = ({selectedFilter, handleClickSelect, filtersArray}) => {



   // @ts-ignore
   return (
      <ul className={s.list}>
         {/* @ts-ignore */}
         {filtersArray.map((item, i) => (
            <li key={i} onClick={() => handleClickSelect(i)}
                className={`${s.item} ${selectedFilter === i ? s.active : ''}`}>
               {item.name}
               <span>({item.count})</span>
            </li>
         ))}
      </ul>
   );
};

export default TodoFilters;