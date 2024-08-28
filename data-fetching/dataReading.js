import { supabase } from "../config/supabaseClient";

export const getRecentOffers = async () => {
  let { data, error } = await supabase
    .from("Offer")
    .select(
      `
      *,
      Recruiter (
        email,
        company
      )
    `
    )
    .order("createdAt", { ascending: false })
    .limit(10);

  if (error) {
    alert(error.message);
    return;
  }

  if (data) {
    return data;
  }
};

export const getFilteredOffers = async (jobName, category, location) => {
  let query = supabase
    .from("Offer")
    .select(
      `
      *,
      Recruiter (
        email,
        company
      )
    `
    )
    .order("createdAt", { ascending: false });

  if (jobName) {
    query = query.ilike("jobTitle", `%${jobName}%`);
  }

  if (category) {
    query = query.eq("workLocationType", category);
  }

  if (location) {
    query = query.ilike("location", `%${location}%`);
  }

  const { data, error } = await query;

  if (error) {
    alert(error.message);
    return [];
  }

  return data || [];
};

export const getOfferById = async (offerId) => {
  try {
    const { data, error } = await supabase
      .from("Offer")
      .select(
        `
        *,
        Recruiter (
          email,
          company
        )
      `
      )
      .eq("id", offerId)
      .single();

    if (error) {
      alert(`Error fetching offer: ${error.message}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    alert("An unexpected error occurred. Please try again.");
    return null;
  }
};

export const getCandidateByUserId = async (userId) => {
  let query = supabase.from("Candidate").select(`*`).eq("userId", userId);

  const { data, error } = await query;

  if (error) {
    alert(error.message);
    return null;
  }

  return data || [];
};
