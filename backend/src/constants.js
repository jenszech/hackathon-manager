const ErrorMsg = Object.freeze({
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid credentials',
    INVALID_TOKEN: 'Invalid Token',
    NO_PERMISSION: 'No permission to access this resource'
  },
  VALIDATION: {
    MISSING_FIELDS: 'Missing fields',
    CONFLICT: 'Already exists',
    WRONG_USER: 'Not the same user'
  },
  SERVER: {
    ERROR: 'Server error',
    NO_PASSWORD: 'No password is set'
  },
  NOT_FOUND: {
    NO_USER: 'No user found',
    NO_PROJECT: 'No project found',
    NO_EVENT: 'No event found',
    NO_PARTICIPANT: 'No participant found',
    NO_INITIATOR: 'No initiator found'
  }
});

const EventTypes = {
  PROJECT_CHANGE: 'Project Changed',
  PARTICIPANT_CHANGE: 'Participant Changed'
};

const RoleTypes = {
  ADMIN: 1,
  MANAGER: 2,
  USER: 3,
  GUEST: 4,
  NEW: 5,
  DUMMY: 6
};

module.exports = { ErrorMsg, EventTypes, RoleTypes };
