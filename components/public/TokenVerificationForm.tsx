"use client";

import {
useEffect,
useState,
useTransition,
} from "react";

import {
CheckCircle2,
ClipboardPaste,
Loader2,
XCircle,
} from "lucide-react";

import { checkTokenAction } from "@/app/actions/vote/check-token";
import { verifyTokenAction } from "@/app/actions/verify-token";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
electionId: string;
}

interface VerifyState {
success: boolean;
message?: string;
}

interface CheckState {
checked: boolean;
valid: boolean;
message?: string;
}

export default function TokenVerificationForm({
electionId,
}: Props) {
const [token, setToken] = useState("");

const [checkState, setCheckState] =
useState<CheckState>({
checked: false,
valid: false,
});

const [checking, startChecking] =
useTransition();

const [submitting, setSubmitting] =
useState(false);

const [verifyState, setVerifyState] =
useState<VerifyState>({
success: false,
});

useEffect(() => {
const normalizedToken = token
.trim()
.toUpperCase();


/*
 * Don't check until exactly 8 characters
 * have been entered.
 */
if (normalizedToken.length !== 8) {
  setCheckState({
    checked: false,
    valid: false,
  });

  return;
}

/*
 * Token must contain only A-F and 0-9.
 */
if (!/^[A-F0-9]{8}$/.test(normalizedToken)) {
  setCheckState({
    checked: true,
    valid: false,
    message:
      "Token must contain only letters A-F and numbers 0-9.",
  });

  return;
}

let cancelled = false;

/*
 * Small delay prevents a database request
 * on every single keystroke.
 */
const timer = setTimeout(() => {
  startChecking(async () => {
    try {
      const result =
        await checkTokenAction(
          electionId,
          normalizedToken
        );

      if (cancelled) return;

      setCheckState({
        checked: true,
        valid: result.valid,
        message: result.message,
      });
    } catch (error) {
      if (cancelled) return;

      console.error(
        "TOKEN CHECK ERROR:",
        error
      );

      setCheckState({
        checked: true,
        valid: false,
        message:
          "Unable to check token. Please try again.",
      });
    }
  });
}, 350);

return () => {
  cancelled = true;
  clearTimeout(timer);
};


}, [token, electionId]);

function handleTokenChange(
value: string
) {
const normalized = value
.replace(/\s/g, "")
.toUpperCase()
.slice(0, 8);


setToken(normalized);

/*
 * Changing the token clears the previous
 * database verification result.
 */
setCheckState({
  checked: false,
  valid: false,
});

setVerifyState({
  success: false,
});


}

/*

* Paste token from clipboard.
  */
  async function handlePasteToken() {
  try {
  const clipboardText =
  await navigator.clipboard.readText();

  const normalized = clipboardText
  .replace(/\s/g, "")
  .toUpperCase()
  .slice(0, 8);

  handleTokenChange(normalized);
  } catch (error) {
  console.error(
  "PASTE TOKEN ERROR:",
  error
  );

  setVerifyState({
  success: false,
  message:
  "Unable to access your clipboard. Please paste the token manually.",
  });
  }
  }

async function handleSubmit(
event: React.FormEvent<HTMLFormElement>
) {
event.preventDefault();

if (!checkState.valid) {
  return;
}

setSubmitting(true);

const formData = new FormData();

formData.set("token", token);

try {
  const result =
    await verifyTokenAction(
      electionId,
      {
        success: false,
      },
      formData
    );

  /*
   * Normally successful verification redirects
   * inside verifyTokenAction.
   */
  setVerifyState(result);
} catch (error) {
  /*
   * redirect() intentionally throws NEXT_REDIRECT.
   * Allow Next.js to handle that redirect.
   */
  if (
    error &&
    typeof error === "object" &&
    "digest" in error &&
    String(
      (error as { digest?: string }).digest
    ).startsWith("NEXT_REDIRECT")
  ) {
    throw error;
  }

  console.error(
    "TOKEN VERIFICATION ERROR:",
    error
  );

  setVerifyState({
    success: false,
    message:
      "Unable to verify token. Please try again.",
  });
} finally {
  setSubmitting(false);
}


}

const isBusy =
checking || submitting;

return ( <form
   onSubmit={handleSubmit}
   className="space-y-6"
 > <div className="space-y-3"> <label
       htmlFor="token"
       className="block text-sm font-medium text-slate-300"
     >
Voting Token </label>

    <div className="relative">
      <Input
        id="token"
        name="token"
        value={token}
        onChange={(event) =>
          handleTokenChange(
            event.target.value
          )
        }
        placeholder="Enter 8-character token"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="characters"
        spellCheck={false}
        disabled={isBusy}
        maxLength={8}
        className={`h-14 pr-24 text-center text-lg font-semibold uppercase tracking-[0.3em] transition ${
          checkState.valid
            ? "border-emerald-500 focus:border-emerald-500"
            : checkState.checked
              ? "border-red-500 focus:border-red-500"
              : "border-slate-700 focus:border-cyan-500"
        }`}
      />

      {/* Paste button */}
      {!checking &&
        !submitting &&
        !checkState.valid && (
          <button
            type="button"
            onClick={handlePasteToken}
            aria-label="Paste voting token"
            title="Paste token"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <ClipboardPaste className="h-5 w-5" />
          </button>
        )}

      {/* Checking icon */}
      {checking && (
        <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-cyan-400" />
      )}

      {/* Valid icon */}
      {!checking &&
        checkState.valid && (
          <CheckCircle2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-400" />
        )}

      {/* Invalid icon */}
      {!checking &&
        checkState.checked &&
        !checkState.valid && (
          <XCircle className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-red-400" />
        )}
    </div>

    {!checkState.checked &&
      token.length < 8 && (
        <p className="text-sm text-slate-500">
          Enter your 8-character voting token.
        </p>
      )}

    {checking && (
      <div className="flex items-center gap-2 text-sm text-cyan-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Checking token...</span>
      </div>
    )}

    {!checking &&
      checkState.valid && (
        <div className="flex items-center gap-2 text-sm text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />

          <span>
            Token verified. You can continue.
          </span>
        </div>
      )}

    {!checking &&
      checkState.checked &&
      !checkState.valid && (
        <div className="flex items-center gap-2 text-sm text-red-400">
          <XCircle className="h-4 w-4" />

          <span>
            {checkState.message ||
              "Invalid voting token."}
          </span>
        </div>
      )}

    {verifyState.message && (
      <div
        className={`rounded-lg border p-3 text-sm ${
          verifyState.success
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            : "border-red-500/30 bg-red-500/10 text-red-400"
        }`}
      >
        {verifyState.message}
      </div>
    )}
  </div>

  <Button
    type="submit"
    disabled={
      isBusy ||
      !checkState.valid
    }
    className={`h-12 w-full font-semibold ${
      checkState.valid
        ? "bg-cyan-500 text-black hover:bg-cyan-400"
        : "cursor-not-allowed bg-slate-700 text-slate-400"
    }`}
  >
    {submitting
      ? "Verifying..."
      : checkState.valid
        ? "Verify Token"
        : "Enter Valid Token"}
  </Button>
</form>


);
}
