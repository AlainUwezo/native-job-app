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

export const createApplication = async (
  applicatedAt,
  score,
  status,
  offerId,
  candidateId
) => {
  const { data, error } = await supabase
    .from("Application")
    .insert([
      {
        applicatedAt: applicatedAt.toISOString(), // Convertir la date en format ISO
        score: score,
        status: status,
        offerId: offerId,
        candidateId: candidateId,
      },
    ])
    .select();

  if (error) {
    alert(error.message);
    return;
  }

  if (data) {
    return data;
  }
};
