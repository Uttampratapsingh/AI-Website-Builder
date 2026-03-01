export const buildUpdatePrompt = (changePrompt, originalCode) => {
  return `
  UPDATE THIS EXISTING WEBSITE CODE BASE TO INCORPORATE THE FOLLOWING CHANGE:

  --------------------------------
  CURRENT CODE: ${originalCode}
  --------------------------------
  CHANGE REQUEST: ${changePrompt}
  --------------------------------

  RETURN RAW JSON ONLY IN THE FOLLOWING FORMAT:

  {
    "code": "UPDATED FULL CODE BASE HERE",
    "message": "SHORT CONFIRMATION MESSAGE ABOUT THE UPDATE"
  }
`;
};

export default buildUpdatePrompt;