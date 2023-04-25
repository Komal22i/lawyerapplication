const initialState = {
  appointments: [],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOOK_APPOINTMENT":
      return { ...state, appointments: action.value };

    default: {
      return state;
    }
  }
};

export default bookingReducer;
