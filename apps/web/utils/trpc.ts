// utils/trpc.ts
import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "server/src/routes";

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}
