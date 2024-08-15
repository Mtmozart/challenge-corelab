import { ChangeEvent, FormEvent, useState } from 'react';
import { ITaskCRrated } from '../../../../interface/task';
import axiosInstance from '../../../../config/api';
import styles from './styles.module.scss';
import { Input } from '../../Input';
import useMessage from '../../../../hooks/useMessage';
import axios from 'axios';
import TextArea from '../../Text-area';
import Select from '../../Select';
import { useNavigate } from 'react-router-dom';

interface UpdateTaskFormProps {
  task: ITaskCRrated;
}

const statusOptions = [
  { value: 'created', label: 'Criada' },
  { value: 'pending', label: 'Pendente' },
  { value: 'in_progress', label: 'Em Progresso' },
  { value: 'completed', label: 'Concluída' },
  { value: 'cancelled', label: 'Cancelada' },
];

export function UpdateTaskForm({ task }: UpdateTaskFormProps) {
  const { setMessage } = useMessage();
  const navigate = useNavigate();
  const [updateTask, setUpdateTask] = useState<ITaskCRrated>({
    ...task,
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setUpdateTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let msgText = 'Task atualizada com sucesso';
    let msgType = 'success';

    const { limitDate, ...dataToUpdate } = updateTask;
    const dataToSend = limitDate ? { ...dataToUpdate, limitDate } : dataToUpdate;

    try {
      await axiosInstance.put(`/task/${task.id}`, dataToSend);
      setMessage(msgText, msgType);
    } catch (error: any) {
      msgText = 'Erro desconhecido';
      msgType = 'error';
      if (axios.isAxiosError(error)) {
        msgText = error.response?.data?.message || 'Erro desconhecido';
      }
      setMessage(msgText, msgType);
    }
    navigate(`/task/${task.id}`);
  }

  return (
    <section className={styles.main__container}>
      <div className={styles.main__container__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <Input
              text="Título"
              type="text"
              name="title"
              placeholder="Título"
              maxLength={50}
              value={updateTask.title}
              handleOnChange={handleChange}
            />
            <TextArea
              text="Descrição"
              name="description"
              placeholder="Descrição"
              maxLength={250}
              handleOnChange={handleChange}
              value={updateTask.description}
            />
            <Input
              text="Data"
              type="date"
              name="limitDate"
              placeholder="Data limite"
              handleOnChange={handleChange}
            />
            <Select
              text={'Status'}
              name={'status'}
              options={statusOptions}
              handleOnChange={handleChange}
              value={updateTask.status}
            />
          </div>
          <input className={styles.submit_button} type="submit" value="Atualizar" />
        </form>
      </div>
    </section>
  );
}
