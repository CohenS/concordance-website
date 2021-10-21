export const dataReducer = (state = null, action) => {
    switch (action.type) {
      case "DATA":
        return action.payload;
      default:
        return state;
    }
};
  