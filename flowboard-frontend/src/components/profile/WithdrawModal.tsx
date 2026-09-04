import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useWithdrawRequestMutation } from "@/redux/features/earnings/earnings.api";
import { toast } from "react-toastify";

type Props = {
  currentEarnings: number;
};

export default function WithdrawModal({ currentEarnings }: Props) {
  const [withdrawRequest, { isLoading }] = useWithdrawRequestMutation();
  const [open, setOpen] = useState(false);
  const [amountStr, setAmountStr] = useState("");
  const [stripeLink, setStripeLink] = useState("");
  const [error, setError] = useState<string | null>(null);

  const currency = "$";

  const amount = useMemo(() => {
    const n = parseFloat(amountStr.replace(/,/g, ""));
    return Number.isFinite(n) ? n : 0;
  }, [amountStr]);
  console.log(stripeLink);

  const percent = useMemo(() => {
    if (!currentEarnings) return 0;
    return Math.min(100, Math.round((amount / currentEarnings) * 100));
  }, [amount, currentEarnings]);

  function formatCurrency(v: number) {
    return `${currency} ${v.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);

    if (amount <= 0) {
      setError("Enter a valid amount.");
      return;
    }

    if (amount > currentEarnings) {
      setError("Amount exceeds current earnings.");
      return;
    }
    const data = { amount };
    const response: any = await withdrawRequest(data);
    console.log(response.error);
    if (response.data) {
      toast.success(response.data.message);
      setOpen(false);
      setStripeLink("");
    } else if (response.error.status == 403) {
      setError("Your account not connected with stripe");
      setStripeLink(response.error.data?.message);
    } else {
      toast.error(response.error.data.message);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2 w-full font-medium mt-4 bg-primary text-white rounded-[8px] hover:bg-primary"
      >
        Withdraw
      </button>

      {!open ? null : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-secondary via-fuchsia-600 to-rose-500 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Withdraw Funds</h2>
                  <p className="text-sm text-indigo-100 mt-1">
                    Payout processed within 1–3 business days.
                  </p>
                </div>

                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="bg-white/20 rounded-[5px] p-3 text-sm text-right">
                    <div className="font-semibold">Available</div>
                    <div className="text-lg font-bold">
                      {formatCurrency(currentEarnings)}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="text-sm font-medium">Amount</label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={amountStr}
                    onChange={(e) => setAmountStr(e.target.value)}
                    placeholder="0.00"
                    className="input-design"
                  />
                  <span className="text-gray-500 font-medium">{currency}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Max: {formatCurrency(currentEarnings)}
                </p>
              </div>
              <div className="bg-gray-50 border rounded-[5px] p-4">
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-gray-500">Requested</div>
                    <div className="text-lg font-semibold">
                      {formatCurrency(amount)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500">Available</div>
                    <div className="text-lg font-semibold">
                      {formatCurrency(currentEarnings)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${percent}%` }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-rose-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {percent}% of balance
                </p>
              </div>
              {stripeLink && (
                <a href={stripeLink} target="_blank" rel="noopener noreferrer">
                  <button
                    className="bg-primary text-white w-full rounded-[5px] py-1 text-center mt-2"
                    type="button"
                  >
                    Connect Now
                  </button>
                </a>
              )}

              {error && (
                <p className="text-sm text-red-600 font-medium">{error}</p>
              )}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700  rounded-[5px] border  hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-[5px] hover:bg-gray-200"
                    onClick={() =>
                      setAmountStr((currentEarnings / 2).toFixed(2))
                    }
                    disabled={isLoading}
                  >
                    Half
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2 bg-primary text-white rounded-[5px] hover:bg-indigo-700 flex items-center gap-2"
                  >
                    {isLoading && (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    Send Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
