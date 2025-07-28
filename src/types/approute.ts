// Define all app routes
export type AppRoute =
  | "/"
  | "/(tabs)"
  | "/(tabs)/index"
  | "/(tabs)/catalog" 
  | "/(tabs)/sellers"
  | "/(tabs)/profile"
  | "/(auth)/login"
  | "/details/[id]"
  | `/details/${string}`;

// Route validation helper
export const isAppRoute = (route: string): route is AppRoute => {
  const validRoutes = [
    "/",
    "/(tabs)",
    "/(tabs)/index",
    "/(tabs)/catalog",
    "/(tabs)/sellers", 
    "/(tabs)/profile",
    "/(auth)/login"
  ];
  
  return validRoutes.includes(route) || 
         route.startsWith("/details/");
};