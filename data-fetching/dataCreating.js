import { supabase } from "../config/supabaseClient";

export const createCandidate = async (
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
    .insert([
      {
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
      },
    ])
    .select();

  if (error) {
    alert(error.message);
    return;
  }

  if (data) {
    alert("Candidat ajouté avec succès!");
    return data;
  }
};
