import Collections from "@/components/shared/Collections";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrderByBuyer } from "@/lib/actions/order.action";

async function page() {
  const { sessionClaims } = auth();
  const { userId } = sessionClaims?.userId as { userId: string };
  const OrganizedEvents = await getEventsByUser({ userId, page: 1 });
  const orders = await getOrderByBuyer(userId);

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between '>
          <h3 className='text-center h3-bold sm:text-left'>My tickets</h3>
          <Button asChild className='button hidden sm:flex'>
            <Link href='/#events'>Explore more events</Link>
          </Button>
        </div>
      </section>
      <section className='wrapper my-8'>
        <Collections
          data={orders}
          emptyTitle='No Ticket purchased'
          emptyStateSubtext='come back later'
          collectionType='My_Tickets'
          limit={3}
          page={1}
          totalPages={2}
          urlParamName='ordersPages'
        />
      </section>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between '>
          <h3 className='text-center h3-bold sm:text-left'>Events Organized</h3>
          <Button asChild className='button hidden sm:flex'>
            <Link href='/events/create'>Create New Event</Link>
          </Button>
        </div>
      </section>
      <section className='wrapper my-8'>
        <Collections
          data={OrganizedEvents?.data}
          emptyTitle='No events have been created'
          emptyStateSubtext='Go create some now'
          collectionType='Events_Organizer'
          limit={3}
          page={1}
          totalPages={2}
          urlParamName='eventsPages'
        />
      </section>
    </>
  );
}

export default page;
