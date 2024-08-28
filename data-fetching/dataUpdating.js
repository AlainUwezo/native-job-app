import { supabase } from "../config/supabaseClient";

export const updateCandidateById = async (
  candidateId,
  resume,
  gender,
  birthDate,
  competences,
  experiences,
  formations,
  spokenLanguages,
  firstName,
  lastName,
  email,
  userId
) => {
  const { data, error } = await supabase
    .from("Candidate")
    .update({
      resume: resume,
      gender: gender,
      birthDate: birthDate.toISOString(),
      competences: competences,
      experiences: experiences,
      formations: formations,
      spokenLanguages: spokenLanguages,
      firstName: firstName,
      lastName: lastName,
      email: email,
      userId: userId,
    })
    .eq("id", candidateId)
    .select();

  if (error) {
    alert(error.message);
    return;
  }

  if (data) {
    return data;
  }
};
