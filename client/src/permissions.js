const permissions = [
  { role: "Administrator", deny: [] },
  {
    role: "Test",
    deny: ["Manage Users", "Pending Vacancies", "Approve Vacancy"],
  },
];

const userHasPermission = ({ userRole, permission }) => {
  const userPermissions = permissions.find((user) => user.role === userRole);
  const userHasPermission = !userPermissions.deny.includes(permission);
  return userHasPermission;
};

export default userHasPermission;
