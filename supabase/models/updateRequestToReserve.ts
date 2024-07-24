import newClient from '../utils/newClient';

export const updateRequestToReserve = async (
  itemId: number,
  userId: string
) => {
  try {
    const supabase = newClient();

    const { data: item, error: fetchError } = await supabase
      .from('items')
      .select('requestedToReserve')
      .eq('id', itemId)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    const currentRequestedToReserve = item?.requestedToReserve || [];
    const updatedRequestedToReserve = [...currentRequestedToReserve, userId];

    const { error: updateError } = await supabase
      .from('items')
      .update({ requestedToReserve: updatedRequestedToReserve })
      .eq('id', itemId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    alert('Item reserved successfully');
  } catch (error) {
    console.error('Error reserving item:', error);
    alert('Failed to reserve item');
  }
};
