import s from './TodoFilters.module.scss'

const TodoFilters = () => {
   const filters = ['Все', 'в работе', 'сделано'];

   return (
      <ul className={s.list}>
         {filters.map((item, i) => (
            <li key={i} className={`${s.item} ${s.active}`}>
               {item}
               <span>(5)</span>
            </li>
         ))}
      </ul>
   );
};

export default TodoFilters;