import s from './TodoForm.module.scss'

const TodoForm = () => {
   return (
      <form className={s.form}>
         <input className={s.input} type="text" placeholder="Task To Be Done..."/>
         <button className={s.button}>Add</button>
      </form>
   );
};

export default TodoForm;