export interface ITaskCreate {
  userId: string;
  title: string;
  description: string;
  limitDate: Date;
  status: 'created' | 'pending' | 'in_progress' | 'in_progress' | 'completed' | 'cancelled';
}

export interface ITask {
  id?: string;
  title: string;
  description: string;
  limitDate: Date;
  status: 'created' | 'pending' | 'in_progress' | 'in_progress' | 'completed' | 'cancelled';
  favorite: boolean;
}

export interface ITaskCRrated {
  id: string;
  title: string;
  description: string;
  limitDate: Date;
  status: '' | 'created' | 'pending' | 'in_progress' | 'in_progress' | 'completed' | 'cancelled';
  favorite: boolean;
}
