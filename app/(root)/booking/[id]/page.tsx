import OrderForm from "@/components/shared/OrderForm";
import { getEventById } from "@/lib/actions/event.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

type UserId = {
  userId: string;
};

async function page({ params: { id } }: { params: { id: string } }) {
  const { sessionClaims } = auth();
  const { userId } = sessionClaims?.userId as UserId;
  const event = await getEventById(id);
  const user = await getUserById(userId);
 
  return (
    <>
      <OrderForm eventId={event._id} price={event.price} userId={user._id} />
    </>
  );
}

export default page;
