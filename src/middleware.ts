import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_key'
);

// Pages qui nécessitent une authentification
const protectedRoutes = [
  '/dashboard',
  '/translate',
  '/upload',
  '/admin'
];

// Pages publiques
const publicRoutes = [
  '/',
  '/auth',
  '/api/auth/login',
  '/api/auth/register'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Vérifier si la route est protégée
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Vérifier si la route est publique
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  );

  // Si c'est une route statique ou API non protégée, laisser passer
  if (pathname.startsWith('/_next/') || 
      pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/me')) {
    return NextResponse.next();
  }

  // Récupérer le token d'authentification
  const token = request.cookies.get('auth-token')?.value;

  if (isProtectedRoute) {
    if (!token) {
      // Rediriger vers la page de connexion
      const url = request.nextUrl.clone();
      url.pathname = '/auth';
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }

    try {
      // Vérifier la validité du token
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (_error) {
      // Token invalide, rediriger vers la page de connexion
      const url = request.nextUrl.clone();
      url.pathname = '/auth';
      url.searchParams.set('from', pathname);
      
      // Supprimer le token invalide
      const response = NextResponse.redirect(url);
      response.cookies.delete('auth-token');
      return response;
    }
  }

  // Pour les routes publiques ou non protégées
  if (isPublicRoute || !isProtectedRoute) {
    // Si l'utilisateur est déjà connecté et essaie d'accéder à /auth, rediriger vers dashboard
    if (pathname === '/auth' && token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      } catch (_error) {
        // Token invalide, laisser accéder à /auth
        const response = NextResponse.next();
        response.cookies.delete('auth-token');
        return response;
      }
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
