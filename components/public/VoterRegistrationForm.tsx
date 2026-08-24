"use client";

import {
  useActionState,
  useState,
} from "react";

import {
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  X,
  XCircle,
} from "lucide-react";

import { registerVoterAction } from "@/app/actions/vote/register";
import { checkIdentifierAction } from "@/app/actions/vote/check-identifier";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  electionId: string;
  uniqueIdentifier: string;
}

interface RegisterState {
  success: boolean;
  message?: string;
  token?: string;
  electionId?: string;
}

interface IdentifierState {
  checked: boolean;
  available: boolean;
  message?: string;
}

export default function VoterRegistrationForm({
  electionId,
  uniqueIdentifier,
}: Props) {
  const initialState: RegisterState = {
    success: false,
  };

  const [
    registerState,
    formAction,
    pending,
  ] = useActionState(
    registerVoterAction,
    initialState
  );

  const [
    identifier,
    setIdentifier,
  ] = useState("");

  const [
    identifierState,
    setIdentifierState,
  ] = useState<IdentifierState>({
    checked: false,
    available: false,
  });

  const [
    checkingIdentifier,
    setCheckingIdentifier,
  ] = useState(false);

  const [
    copied,
    setCopied,
  ] = useState(false);

  const [
    showSuccess,
    setShowSuccess,
  ] = useState(false);

  /*
   * Check unique identifier against database.
   */
  async function checkIdentifier(
    value: string
  ) {
    const normalized = value
      .trim()
      .toLowerCase();

    setIdentifier(value);

    setIdentifierState({
      checked: false,
      available: false,
    });

    if (!normalized) {
      return;
    }

    setCheckingIdentifier(true);

    try {
      const result =
        await checkIdentifierAction(
          electionId,
          uniqueIdentifier,
          normalized
        );

      setIdentifierState({
        checked: true,
        available: result.available,
        message: result.message,
      });
    } catch (error) {
      console.error(
        "IDENTIFIER CHECK ERROR:",
        error
      );

      setIdentifierState({
        checked: true,
        available: false,
        message:
          "Unable to verify identifier.",
      });
    } finally {
      setCheckingIdentifier(false);
    }
  }

  /*
   * Copy token.
   */
  async function copyToken() {
    if (!registerState.token) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        registerState.token
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "COPY TOKEN ERROR:",
        error
      );
    }
  }

  /*
   * Show success popup after successful
   * registration.
   */
  if (
    registerState.success &&
    registerState.token &&
    !showSuccess
  ) {
    setShowSuccess(true);
  }

  return (
    <>
      <form
        action={formAction}
        className="space-y-6"
      >
        <input
          type="hidden"
          name="election_id"
          value={electionId}
        />

        {/* FULL NAME */}
        <div className="space-y-2">
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-slate-300"
          >
            Full Name
          </label>

          <Input
            id="full_name"
            name="full_name"
            required
            className="h-12"
            placeholder="Enter your full name"
          />
        </div>

        {/* PHONE */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-300"
          >
            Phone Number
          </label>

          <Input
            id="phone"
            name="phone"
            required
            className="h-12"
            placeholder="Enter your phone number"
          />
        </div>

        {/* EMAIL / UNIQUE IDENTIFIER */}
        <div className="space-y-2">
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-slate-300"
          >
            {uniqueIdentifier === "email"
              ? "Email Address"
              : uniqueIdentifier}
          </label>

          <div className="relative">
            <Input
              id="identifier"
              name={uniqueIdentifier}
              value={identifier}
              onChange={(event) =>
                checkIdentifier(
                  event.target.value
                )
              }
              required
              autoComplete="off"
              className={`h-12 pr-12 ${
                identifierState.available
                  ? "border-emerald-500 focus:border-emerald-500"
                  : identifierState.checked
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-700"
              }`}
              placeholder={
                uniqueIdentifier === "email"
                  ? "Enter your email address"
                  : `Enter your ${uniqueIdentifier}`
              }
            />

            {checkingIdentifier && (
              <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-cyan-400" />
            )}

            {!checkingIdentifier &&
              identifierState.available && (
                <CheckCircle2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-400" />
              )}

            {!checkingIdentifier &&
              identifierState.checked &&
              !identifierState.available && (
                <XCircle className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-red-400" />
              )}
          </div>

          {checkingIdentifier && (
            <p className="text-sm text-cyan-400">
              Checking identifier...
            </p>
          )}

          {!checkingIdentifier &&
            identifierState.available && (
              <p className="flex items-center gap-2 text-sm text-emerald-400">
                <Check className="h-4 w-4" />
                Identifier available. You can continue.
              </p>
            )}

          {!checkingIdentifier &&
            identifierState.checked &&
            !identifierState.available && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <X className="h-4 w-4" />
                {identifierState.message ||
                  "This identifier is already registered."}
              </p>
            )}
        </div>

        {/* ERROR */}
        {registerState.message &&
          !registerState.success && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {registerState.message}
            </div>
          )}

        {/* REGISTER BUTTON */}
        <Button
          type="submit"
          disabled={
            pending ||
            checkingIdentifier ||
            !identifierState.available
          }
          className={`h-12 w-full font-semibold ${
            identifierState.available
              ? "bg-cyan-500 text-black hover:bg-cyan-400"
              : "cursor-not-allowed bg-slate-700 text-slate-400"
          }`}
        >
          {pending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Registering...
            </span>
          ) : (
            "Register & Continue"
          )}
        </Button>
      </form>

      {/* SUCCESS POPUP */}
      {showSuccess &&
        registerState.token && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-3xl border border-emerald-500/30 bg-slate-900 p-8 shadow-2xl">

              {/* CLOSE */}
              <button
                type="button"
                onClick={() =>
                  setShowSuccess(false)
                }
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              {/* SUCCESS ICON */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </div>

              <div className="mt-5 text-center">
                <h2 className="text-2xl font-bold text-white">
                  Registration Successful!
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Your registration has been completed
                  successfully. This is your one-time
                  voting token.
                </p>
              </div>

              {/* TOKEN */}
              <div className="mt-6">
                <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                  Your Voting Token
                </p>

                <div className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-slate-950 p-3">
                  <div className="flex-1 text-center font-mono text-2xl font-bold tracking-[0.35em] text-cyan-400">
                    {registerState.token}
                  </div>

                  <Button
                    type="button"
                    onClick={copyToken}
                    className="h-10 bg-slate-800 text-white hover:bg-slate-700"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* WARNING */}
              <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
                <p className="text-sm text-yellow-400">
                  Keep this token safe. You need it
                  to access your ballot.
                </p>
              </div>

              {/* VERIFY BUTTON */}
              <a
                href={`/elections/${electionId}/verify`}
                className="mt-6 block"
              >
                <Button
                  type="button"
                  className="h-12 w-full bg-cyan-500 font-semibold text-black hover:bg-cyan-400"
                >
                  Verify & Vote
                </Button>
              </a>

              <p className="mt-4 text-center text-xs text-slate-500">
                Copy your token before continuing.
              </p>
            </div>
          </div>
        )}
    </>
  );
}