import { getUserData } from "../utils/googleSheets";

export default defineEventHandler(async (event) => {
  try {
    const data = await getUserData();

    if (!data) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch portfolio data from Google Sheets",
      });
    }

    return data;
  } catch (error) {
    console.error("API Error fetching portfolio data:", error);

    throw createError({
      statusCode: 500,
      statusMessage:
        error instanceof Error ? error.message : "Internal server error",
    });
  }
});
