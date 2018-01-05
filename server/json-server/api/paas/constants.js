module.exports = {
  ROLES: {
    MANAGER: 'PAAS Manager',
    HR_ADMIN: 'PAAS HR Admin',
    SECURITY_ADMIN: 'PAAS Security Admin',
  },
  APPROVAL: {
    NONE: undefined,
    DENY: 0,
    APPROVE: 1,
  },
  AUTH: {
    IO: 'id',
    SID: 'sid',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    EMAIL: 'email',
    POS_NUMBER: 'posNumber',
    MANAGER_SID: 'managerSid',
    MANAGER_NAME: 'managerName',
    STATUS: 'status',
    LAST_MODIFIED: 'lastModified',
  },
  STATUS: {
    MIN: 0,
    MAX: 1,
  },
};
