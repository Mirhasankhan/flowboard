"use client";

import { CheckCircle, Loader } from "lucide-react";
import {
  useCheckoutSessionMutation,
  usePlansQuery,
} from "@/redux/features/subscription/subscription.api";
import Container from "@/utils/Container";
import { useState } from "react";
import { SkeletonCard } from "@/components/shared/Skeleton";

export default function SubscriptionPlans() {
  const { data: response, isLoading } = usePlansQuery("");
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [subscribe, { isLoading: isCheckoutLoading }] =
    useCheckoutSessionMutation();

  const plans = response?.data || [];

  // 🔍 Find if user already has a subscription
  const activePlan = plans.find((p: any) => p.userSubscription !== null);

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoadingPriceId(priceId);
      const response = await subscribe({ priceId });
      const url = response?.data?.data?.url;
      if (url) window.open(url, "_blank");
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setLoadingPriceId(null);
    }
  };

  const handleCancel = async (subscriptionPayId: string) => {
    console.log("Cancel subscription:", subscriptionPayId);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-16 px-4">
      <Container>
        <h1 className="text-4xl text-center font-extrabold text-gray-800 mb-4">
          Choose the Right Plan
        </h1>

        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Get listed, get noticed, and connect with clients faster. Flexible
          plans tailored for legal professionals.
        </p>

        {isLoading ? (
          <div className="grid grid-col-1 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonCard height={430} key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan: any) => {
              const isSubscribed = plan.userSubscription !== null;
              const disableBuy = activePlan && !isSubscribed;

              return (
                <div
                  key={plan.priceId}
                  className="relative rounded-3xl p-6 h-[450px] shadow-xl cursor-pointer transform transition-all duration-300 bg-white hover:scale-105 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {plan.title}
                    </h3>

                    <div className="text-secondary font-extrabold text-4xl mb-4">
                      ${plan.price}
                      <span className="text-lg font-medium text-gray-500">
                        {plan.type === "Monthly"
                          ? "/month"
                          : plan.type === "Quarterly"
                            ? "/3 months"
                            : "/year"}
                      </span>
                    </div>

                    <ul className="text-left space-y-3 mb-6">
                      {plan.features.map((feature: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start text-gray-700"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {isSubscribed ? (
                    <button
                      onClick={() =>
                        handleCancel(plan.userSubscription.subscriptionPayId)
                      }
                      className="w-full py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-all text-lg"
                    >
                      Cancel Subscription
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        !disableBuy && handleSubscribe(plan.priceId)
                      }
                      disabled={disableBuy || isCheckoutLoading}
                      className={`w-full py-3 rounded-xl font-semibold text-lg transition-all
                      ${
                        disableBuy
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "text-white bg-primary hover:bg-blue-600"
                      }
                    `}
                    >
                      {loadingPriceId === plan.priceId ? (
                        <Loader className="animate-spin mx-auto" />
                      ) : (
                        "Buy Plan"
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
