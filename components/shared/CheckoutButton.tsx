import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CheckoutButton({
  event,
  id,
}: {
  event: IEvent;
  id: string;
}) {
  console.log(event);
  return (
    <div>
      <Button asChild>
        <Link href={`/booking/${id}`}>Book a ticket</Link>
      </Button>
    </div>
  );
}
