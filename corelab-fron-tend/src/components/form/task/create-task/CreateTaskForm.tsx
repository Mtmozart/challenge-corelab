import { ChangeEvent, FormEvent, useState } from 'react';
import { ITaskCreate } from '../../../../interface/task';
import axiosInstance from '../../../../config/api';
import styles from './styles.module.scss';
import { Input } from '../../Input';
import useMessage from '../../../../hooks/useMessage';
import axios from 'axios';
import TextArea from '../../Text-area';
import Select from '../../Select';
import { useNavigate } from 'react-router-dom';

interface CreateTaskFormProps {
  id: string;
}

const statusOptions = [
  { value: 'created', label: 'Criada' },
  { value: 'pending', label: 'Pendente' },
  { value: 'in_progress', label: 'Em Progresso' },
  { value: 'completed', label: 'Concluída' },
  { value: 'cancelled', label: 'Cancelada' },
];

export function CreateTaskForm({ id }: CreateTaskFormProps) {
  const { setMessage } = useMessage();
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState<ITaskCreate>({
    userId: id,
    title: '',
    description: '',
    limitDate: new Date(),
    status: 'created',
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    let msgText = 'Task criada com sucesso';
    let msgType = 'success';
    e.preventDefault();
    try {
      await axiosInstance.post('/task', newTask);
      setMessage(msgText, msgType);
    } catch (error: any) {
      msgText = 'Erro desconhecido';
      msgType = 'error';
      if (axios.isAxiosError(error)) {
        msgText = error.response?.data?.message || 'Erro desconhecido';
      }
    } finally {
      navigate('/tasks');
      setMessage(msgText, msgType);
    }
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
              handleOnChange={handleChange}
            />
            <TextArea
              text="Descrição"
              name="description"
              placeholder="Descrição"
              maxLength={250}
              handleOnChange={handleChange}
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
              value={newTask.status}
            />
          </div>
          <input className={styles.submit_button} type="submit" value="Criar" />
        </form>
      </div>
    </section>
  );
}
