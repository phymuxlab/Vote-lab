"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const KEY = "votelab-cookie-notice-v1";
const CHANGE_EVENT = "votelab-cookie-notice-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(KEY) === "accepted";
}

function getServerSnapshot() {
  return false;
}

export default function CookieBanner() {
  const accepted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (accepted) return null;

  const acceptCookies = () => {
    localStorage.setItem(KEY, "accepted");
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <aside
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-slate-700 bg-slate-950/95 p-4 shadow-2xl backdrop-blur"
      role="region"
      aria-label="Cookie notice"
    >
      <p className="text-sm leading-6 text-slate-300">
        Vote Lab uses essential browser storage and cookies needed for
        authentication, voting sessions and security. Optional analytics are
        not enabled by this notice.{" "}
        <Link href="/cookies" className="text-cyan-400 underline">
          Learn more
        </Link>
        .
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" onClick={acceptCookies}>
          Continue
        </Button>

        <Link href="/privacy">
          <Button size="sm" variant="outline">
            Privacy
          </Button>
        </Link>
      </div>
    </aside>
  );
}
