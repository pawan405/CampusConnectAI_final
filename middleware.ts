import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/ai-roadmap/:path*",
    "/analytics/:path*",
    "/hackathons/:path*",
    "/internship-feed/:path*",
    "/match-analysis/:path*",
    "/silent-scream/:path*",
    "/hackathon-portfolio/:path*",
  ],
};
