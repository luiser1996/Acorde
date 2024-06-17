import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isInDashboard = nextUrl.pathname === '/dashboard';

      // Lógica de redirección de rutas en función de si estas logueado o en dashboard
      if (isOnDashboard) {
        if (isLoggedIn){
          if(isInDashboard) {
            return Response.redirect(new URL('/dashboard/learn', nextUrl));
          } // Redirecciona a learn si se intenta buscar la ruta dashboard 
          else {
            return true;
          }
        }
        else {
          return false;
        } // Redirecciona usuarios sin sesión iniciada al login
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard/learn', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;