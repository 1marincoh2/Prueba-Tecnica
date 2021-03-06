import type { Context, Middleware } from "@nuxt/types";

declare module "@nuxt/types" {
  interface Context {
    userAgent?: string;
  }
}

const Auth: Middleware = ({
  store,
  redirect,
  req,
  route,
  isClient,
}: Context) => {
  if (!store.getters.isAuthenticated) {
    return redirect("/login");
  }
};

export default Auth;
