"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "lww_accessibility_notice_ack_v1";

export default function AccessibilityNoticeModal() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const acknowledged = localStorage.getItem(STORAGE_KEY);
      if (!acknowledged) setOpen(true);
    } catch {
      // If localStorage fails, still show once per page load
      setOpen(true);
    }
  }, []);

  const onConfirm = () => {
    if (!checked) return;
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setOpen(false);
  };

  const onClose = () => {
    // optional: allow close without confirm
    // If you want to require confirm, remove this and the close button.
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-notice-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 id="accessibility-notice-title" className="text-xl font-bold">
          Accessibility Notice
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Little Warrior Wishes is committed to digital accessibility. We
          continually work to improve the experience for all users. If you have
          trouble accessing any part of this site, please contact us and we’ll
          help.
        </p>

        <p className="mt-3 text-sm text-gray-700">
          You can read our{" "}
          <Link className="underline" href="/accessibility">
            Accessibility Statement
          </Link>
          .
        </p>

        <label className="mt-4 flex items-start gap-3 text-sm text-gray-800">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span>
            I understand and acknowledge this notice.
          </span>
        </label>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-xl border px-4 py-2 text-sm font-medium"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: "#1f2937" }} // dark gray, safe contrast
            disabled={!checked}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
