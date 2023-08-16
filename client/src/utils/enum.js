const enums = {
  ACT: true,
  INA: false,
  EXT: "External",
  INT: "Internal",
  PRO: "Promotion",
};

export const getValue = (ENUM) => {
  return enums[ENUM];
};
