import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err: any) {
    console.error("❌ Invalid Stripe signature:", err.message);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  console.log("✅ Evento recebido:", event.type);

  switch (event.type) {
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as unknown as {
        customer: string;
        subscription: string;
        subscription_details: {
          metadata: {
            userId: string;
          };
        };
      };

      if (
        typeof invoice.customer !== "string" ||
        typeof invoice.subscription !== "string"
      ) {
        console.error("Invoice missing customer or subscription");
        break;
      }

      const userId = invoice.subscription_details?.metadata?.userId;

      if (!userId) {
        console.error("User ID not found in invoice metadata");
        break;
      }

      await db
        .update(usersTable)
        .set({
          stripeCustomerId: invoice.customer,
          stripeSubscriptionId: invoice.subscription,
          plan: "essential",
        })
        .where(eq(usersTable.id, userId));

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as unknown as {
        metadata: {
          userId: string;
        };
      };

      if (!subscription.metadata?.userId) {
        console.error("User ID not found in subscription metadata");
        break;
      }

      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: null,
          stripeCustomerId: null,
          plan: null,
        })
        .where(eq(usersTable.id, subscription.metadata.userId));

      break;
    }
  }

  return NextResponse.json({ received: true });
}
