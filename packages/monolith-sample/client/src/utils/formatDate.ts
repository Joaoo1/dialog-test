import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatToHumanFriendlyDate = (date: string | Date): string => {
  const mDate = new Date(date);

  return formatDistanceToNow(mDate, {
    addSuffix: true,
    locale: ptBR,
  });
};

export const formatDate = (date: string | Date): string => {
  const mDate = new Date(date);

  return mDate
    .toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      year: 'numeric',
    })
    .replace(',', '');
};
