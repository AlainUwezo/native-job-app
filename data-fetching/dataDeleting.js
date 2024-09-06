import { supabase } from "../config/supabaseClient";

export const deleteAllApplicationById = async (applicationId) => {
  const { data, error } = await supabase
    .from("Application")
    .delete()
    .eq("id", applicationId);

  if (error) {
    console.error("Erreur lors de la suppression des candidatures :", error);
    throw error;
  }

  return data;
};
