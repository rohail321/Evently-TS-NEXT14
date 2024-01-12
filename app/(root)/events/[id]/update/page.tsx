import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import { UpdateEventParams } from "@/types";
import { auth } from "@clerk/nextjs";
export default async function CreateEvent({
  params: { id },
}: {
  params: { id: string };
}) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as { userId: string };
  const event = await getEventById(id);
  const { startDateTime, endDateTime, ...rest } = event;
  console.log(event);
  let ui =
    event.organizer._id === userId.userId ? (
      <>
        <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
          <h3 className='wrapper h3-bold text-center sm:text-left'>
            Update Event
          </h3>
        </section>

        <div className='wrapper my-8'>
          <EventForm
            userId={userId}
            type='Update'
            event={{
              ...rest,
              startDateTime: new Date(startDateTime),
              endDateTime: new Date(endDateTime),
            }}
          />
        </div>
      </>
    ) : (
      <h1>You are not allowed to make changes to event</h1>
    );
  return ui;
}
