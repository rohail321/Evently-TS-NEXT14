import Collections from "@/components/shared/Collections";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const events = await getAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 6,
  });
  console.log(events?.data);
  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-conatin py-5 md:py-10'>
        <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0'>
          <div className='flex flex-col justify-center gap-8'>
            <h1 className='h1-bold'>Host, Connect, Celebate: our platform</h1>
            <p className='p-reguar-20 md:p-regular-24'>
              Book and learn hepful tips from 3,123+ mentor in world cass
              companies with our global community
            </p>
            <Button size='lg' asChild className='button w-full sm:w-fit'>
              <Link href={"#events"}>Explore Now</Link>
            </Button>
          </div>
          <Image
            className='max-h-[70vh] object-contain object-center 2xl:max-h-[50hv]'
            width={1000}
            height={1000}
            src='/assets/images/hero.png'
            alt='hero'
          />
        </div>
      </section>
      <section
        id='events'
        className='wrapper my-8 flex flex-col gap-8 md:gap-12x`'
      >
        <h2 className='h2-bold'>
          Trusted by <br /> Thousands of Events
        </h2>
        <div className='flex w-full flex-col gap-5 md:flex-row'>
          <Collections
            data={events?.data}
            emptyTitle='No Event Find'
            emptyStateSubtext='Come back later'
            collectionType='All_Events'
            limit={6}
            page={1}
            totalPages={2}
          />
        </div>
      </section>
    </>
  );
}
