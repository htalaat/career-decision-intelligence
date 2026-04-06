import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/client";

/** Fetch all active career paths with their trait mappings */
export function useCareerPaths() {
  return useQuery({
    queryKey: ["career-paths"],
    queryFn: async () => {
      const { data: paths, error: pathsError } = await supabase
        .from("career_paths")
        .select("*")
        .eq("active", true)
        .order("domain")
        .order("title");
      if (pathsError) throw pathsError;

      const { data: mappings, error: mappingsError } = await supabase
        .from("career_trait_mappings")
        .select("*");
      if (mappingsError) throw mappingsError;

      return { paths, mappings };
    },
    staleTime: 30 * 60 * 1000,
  });
}
