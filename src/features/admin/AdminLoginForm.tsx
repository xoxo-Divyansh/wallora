"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

type LoginState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string };

const inputClass =
  "w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm text-brand-text outline-none transition focus:border-brand-accent";

export function AdminLoginForm() {
  const router = useRouter();
  const [state, setState] = useState<LoginState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setState({ status: "error", message: result.message ?? "Unable to log in." });
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-md gap-4 rounded-lg border border-brand-border bg-brand-card p-6">
      <label className="space-y-2 text-sm font-medium">
        Email
        <input className={inputClass} name="email" placeholder="admin@example.com" type="email" />
      </label>

      <label className="space-y-2 text-sm font-medium">
        Password
        <input className={inputClass} name="password" placeholder="Admin password" type="password" />
      </label>

      {state.status === "error" ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{state.message}</p>
      ) : null}

      <Button disabled={state.status === "submitting"} type="submit">
        {state.status === "submitting" ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
