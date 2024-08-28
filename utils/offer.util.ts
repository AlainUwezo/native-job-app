export const getEmploymentTypeText = (employmentType: number): string => {
  switch (employmentType) {
    case 1:
      return "Full-time";
    case 2:
      return "Part-time";
    default:
      return "Unknown";
  }
};

export const getEmploymentType = (fulltime: boolean) => {
  if (fulltime) {
    return 1;
  } else {
    return 2;
  }
};

export const getWorkLocationTypeText = (workLocationType: number): string => {
  switch (workLocationType) {
    case 1:
      return "En ligne";
    case 2:
      return "Sur site";
    case 3:
      return "Hybride";
    default:
      return "Inconnu";
  }
};

export const getWorkLocationType = (remote: boolean, onSite: boolean) => {
  if (remote) {
    return 1;
  } else {
    if (onSite) {
      return 2;
    } else {
      return 3;
    }
  }
};
