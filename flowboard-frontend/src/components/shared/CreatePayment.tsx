"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateBookingMutation } from "@/redux/features/bookings/bookingsApi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  "pk_test_51REjfrBQKf135iFsUrQuBxEM080ZSKcU77jUaEEZdUn58l69NRs6HyFWTpeXsx3I04pXX5nf5imcmvHT3PMbBW4i00K3yeJhLI"
);

interface CheckoutFormProps {
  bookingData: any;
  onClose: () => void;
}

const CheckoutForm = ({ bookingData, onClose }: CheckoutFormProps) => {
  const { email, name } = useAppSelector(useCurrentUser);
  const [createBooking] = useCreateBookingMutation();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email: email || "No Email",
        name: name || "No Name",
      },
    });

    if (error) {
      setCardError(error.message || "");
      setProcessing(false);
      return;
    }

    try {
      const data = {
        ...bookingData,
        paymentMethodId: paymentMethod?.id,
      };
      const response = await createBooking(data);
      if (response.data) {
        router.push("/")
        toast.success("Booking submitted successfully");
        onClose();
      }
    } catch (err) {
      console.error("Booking failed:", err);
      setCardError("Booking failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="p-3 border border-gray-300 rounded-xl bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                fontFamily: "Inter, sans-serif",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#e53e3e" },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={processing}
        className="w-full bg-[#675dff] text-white font-medium py-2 rounded-[6px]"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
      {cardError && (
        <p className="text-red-500 text-sm text-center font-medium mt-2">
          {cardError}
        </p>
      )}
    </form>
  );
};

interface StripeModalProps {
  bookingData: any;
  disabled?: boolean;
}

export default function StripeModal({
  bookingData,
  disabled,
}: StripeModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`w-full py-3 text-white rounded-[4px] mt-3 ${
            disabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary hover:bg-blue-700"
          }`}
          disabled={disabled}
        >
          Pay Now
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white !rounded-[8px] p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold mb-2">
            Secure Payment
          </DialogTitle>
          <p className="text-gray-500 text-center mb-4">
            Enter your card details to pay
          </p>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            bookingData={bookingData}
            onClose={() => setOpen(false)}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
