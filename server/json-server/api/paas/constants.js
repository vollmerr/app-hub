module.exports = {
  ROLES: {
    MANAGER: 'PAAS Manager',
    REPORTS: 'PAAS Reports',
  },
  APPROVAL: {
    NONE: null,
    DENY: 0,
    APPROVE: 1,
  },
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    NO_MANAGER: 'noManager',
  },
  AUTH: {
    ID: '_id',
    SID: 'sid',
    FULL_NAME: 'fullName',
    EMAIL: 'email',
    POS_NUMBER: 'posNumber',
    MANAGER_SID: 'managerSid',
    MANAGER_NAME: 'managerFullName',
    STATUS: 'status',
    LAST_MODIFIED: 'lastUpdated',
    LAST_APPROVED: 'lastApproved',
    DATE_CREATED: 'created',
    AUTH_YEAR: 'authYear',
  },
  APPS: {
    APP_1: 'app1',
    APP_2: 'app2',
    APP_3: 'app3',
    APP_4: 'app4',
  },
  NUM_MANAGERS: 200,
  NUM_EMPLOYEES: 20,
};
