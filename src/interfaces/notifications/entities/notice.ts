export interface INotice {
  id: string;
  type?: string;
  userId?: string;
  title?: string;
  description?: string;
  isViewed?: boolean;
  isHidden?: boolean;
  params?: Record<string, any>;
  createdAt?: Date;
}
