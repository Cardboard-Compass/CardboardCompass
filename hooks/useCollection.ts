import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCollection, addCardToCollection, updateCard, removeCard, CardData } from '@/utils/database';
import { captureError } from '@/utils/errorTracking';

export function useCollection() {
  const queryClient = useQueryClient();

  const { data: cards, isLoading, error } = useQuery({
    queryKey: ['collection'],
    queryFn: getCollection,
  });

  const addCard = useMutation({
    mutationFn: addCardToCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collection'] });
    },
    onError: (error) => {
      captureError(error as Error, {
        context: 'useCollection/addCard',
      });
    },
  });

  const updateCardMutation = useMutation({
    mutationFn: (params: { cardId: string; updates: Partial<CardData> }) =>
      updateCard(params.cardId, params.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collection'] });
    },
    onError: (error) => {
      captureError(error as Error, {
        context: 'useCollection/updateCard',
      });
    },
  });

  const removeCardMutation = useMutation({
    mutationFn: removeCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collection'] });
    },
    onError: (error) => {
      captureError(error as Error, {
        context: 'useCollection/removeCard',
      });
    },
  });

  return {
    cards,
    isLoading,
    error,
    addCard,
    updateCard: updateCardMutation,
    removeCard: removeCardMutation,
  };
}
