// import { PeriodicData } from '../../../interfaces/interfaces';
// // import { useForm, SubmitHandler } from 'react-hook-form';

// type periodicFormProps = {
//   periodic?: Partial<PeriodicData>;
//   onSubmit: SubmitHandler<PeriodicData>;
// };

// export const PeriodicForm = (props: periodicFormProps) => {
//   const { periodic, onSubmit } = props;

//   const { register, handleSubmit, watch } = useForm<PeriodicData>({
//     defaultValues: periodic,
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label>What should this be called?</label>
//       <input {...register('type')} />
//       <label>Each</label>
//       <select {...register('interval')}>
//         <option value="daily">day</option>
//         <option value="weekly">week</option>
//         <option value="yearly">year</option>
//       </select>
//       <label>The account will be</label>
//       <select {...register('action.type')}>
//         <option value="ADD">Added</option>
//         <option value="SUBTRACT">Subtracted</option>
//         <option value="ADDRATE">Be added a rate of</option>
//       </select>
//       <input {...register('action.amount')} />
//       {watch('action.type') === 'ADDRATE' && <span>%</span>}
//       <input type="submit" />
//     </form>
//   );
// };
