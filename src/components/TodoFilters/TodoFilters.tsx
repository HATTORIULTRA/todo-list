import {FC, ReactNode} from "react";
import s from './TodoFilters.module.scss';
import {Filters} from "../../types/types.ts";

interface TodoFiltersProps {
   selectedFilter: number;
   handleClickSelect: (i: number) => void;
   filtersArray: Filters[];
}

const TodoFilters: FC<TodoFiltersProps> = ({selectedFilter, handleClickSelect, filtersArray}): ReactNode => {
   return (
      <ul className={s.list}>
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