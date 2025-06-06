import { PostHog } from "posthog-node";

const isProd = process.env.NODE_ENV === "production";

const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  flushAt: 1,
  flushInterval: 0,
  disabled: !isProd,
});

export default posthogClient;
