export const VacancyStatus = {
  PENDING: "Pending",
  REVIEWED: "Review",
  APPROVED: "Open",
  CLOSED: "Close",
};

export const RecruitmentOptions = [
  { text: "Internal Recruitment", value: "INT" },
  { text: "External Recruitment", value: "EXT" },
  { text: "Promotion Recruitment", value: "PRO" },
  {
    text: "Internal and External Recruitment",
    value: "INT_EXT",
  },
];

export const VacancyStatusOptions = [
  {
    text: "Pending",
    value: "PENDING",
    permission: ["create_vacancy", "review_vacancy"],
  },
  {
    text: "Reviewed",
    value: "REVIEWED",
    permission: ["review_vacancy", "approve_vacancy"],
  },
  { text: "Approved", value: "APPROVED", permission: ["approve_vacancy"] },
  { text: "Closed", value: "CLOSED", permission: ["approve_vacancy"] },
];

export const ApplicationReviewStatus = {
  PENDING: {
    value: "",
    permission: ["recommend_applicaion"],
  },
  RECOMMENDED: {
    step: 1,
    value: "Recommended By ",
    permission: ["certify_application", "recommend_applicaion"],
  },
  CERTIFIED: {
    step: 2,
    value: "Certified By ",
    permission: ["approve_application", "certify_application"],
  },
  APPROVED: {
    step: 3,
    value: "Approved By ",
    permission: ["approve_application"],
  },
};
