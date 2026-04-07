import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/client";

/** Fetch all active career paths with trait mappings and study directions */
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

      const { data: studyDirections, error: sdError } = await supabase
        .from("study_directions")
        .select("*")
        .eq("active", true);
      if (sdError) throw sdError;

      return { paths, mappings, studyDirections };
    },
    staleTime: 30 * 60 * 1000,
  });
}

/** Fetch country study context data */
export function useCountryContext() {
  return useQuery({
    queryKey: ["country-context"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("country_study_context")
        .select("*")
        .eq("active", true);
      if (error) throw error;
      return data;
    },
    staleTime: 60 * 60 * 1000,
  });
}
