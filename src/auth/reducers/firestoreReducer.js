export const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
