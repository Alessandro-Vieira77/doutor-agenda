import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Stripe secret key not found");
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    throw new Error("Stripe signature not found");
  }
  const body = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-12-15.clover",
  });
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  console.log("tipo encontrado: " + event.type);

  switch (event.type) {
    case "invoice.paid": {
      console.log("entrou no evento invoice.paid");
      if (!event.data.object.id) {
        throw new Error("Subscription ID not found");
      }

      const { customer } = event.data.object as unknown as {
        customer: string;
      };

      const session = event.data.object.parent as unknown as {
        subscription_details: {
          subscription: string;
          metadata: {
            userId: string;
          };
        };
      };
      if (!session) {
        throw new Error("Session not found");
      }
      if (!session.subscription_details?.metadata?.userId) {
        throw new Error("User ID not found");
      }
      const userId = session.subscription_details?.metadata?.userId;
      const subscriptionId = session.subscription_details.subscription;

      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: subscriptionId,
          stripeCustomerId: customer,
          plan: "essential",
        })
        .where(eq(usersTable.id, userId));
      break;
    }
    case "customer.subscription.deleted": {
      if (!event.data.object.id) {
        throw new Error("Subscription ID not found");
      }
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );
      if (!subscription) {
        throw new Error("Subscription not found");
      }
      if (!subscription.metadata?.userId) {
        throw new Error("User ID not found");
      }
      const userId = subscription.metadata?.userId;
      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: null,
          stripeCustomerId: null,
          plan: null,
        })
        .where(eq(usersTable.id, userId));
    }
  }
  return NextResponse.json({
    received: true,
  });
};
