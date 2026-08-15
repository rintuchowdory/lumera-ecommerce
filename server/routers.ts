import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createHostedCheckoutSession } from './stripe';

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  checkout: router({
    createSession: protectedProcedure
      .input((value: unknown) => value as { lines: { name: string; description: string; unitAmountEur: number; quantity: number }[] })
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user.email) throw new Error('An email address is required for checkout.');
        return createHostedCheckoutSession({
          origin: ctx.req.headers.origin || 'http://localhost:3000',
          customerEmail: ctx.user.email,
          userId: ctx.user.id,
          customerName: ctx.user.name,
          lines: input.lines,
        });
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
