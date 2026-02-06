import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import type { CVData, Experience, Award, Project } from "../../app/types";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const getDoc = async () => {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!serviceAccountEmail || !privateKey || !sheetId) {
    throw new Error(
      "Missing Google Sheets configuration in environment variables",
    );
  }

  const jwt = new JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: SCOPES,
  });

  const doc = new GoogleSpreadsheet(sheetId, jwt);
  await doc.loadInfo();
  return doc;
};

export const getUserData = async (): Promise<CVData | null> => {
  try {
    const doc = await getDoc();

    // Fetch Bio
    const bioSheet = doc.sheetsByTitle["Bio"];
    let bioData: any = {};
    if (bioSheet) {
      const bioRows = await bioSheet.getRows();
      if (bioRows.length > 0) {
        const row = bioRows[0];
        if (row)
          bioData = {
            name: row.get("name") || "",
            role: row.get("role") || row.get("title") || "",
            location: row.get("location") || "",
            email: row.get("email") || "",
            phone: row.get("phone") || "",
            site: row.get("website") || row.get("site") || "",
            summary: row.get("summary") || row.get("profile") || "",
            github: row.get("github") || "",
            linkedin: row.get("linkedin") || "",
            twitter: row.get("twitter") || "",
            instagram: row.get("instagram") || "",
          };
      }
    }

    // Fetch Experience
    const expSheet = doc.sheetsByTitle["Experience"];
    const experience: Experience[] = [];
    if (expSheet) {
      const expRows = await expSheet.getRows();
      expRows.forEach((row) => {
        experience.push({
          role: row.get("role") || "",
          company: row.get("company") || "",
          period: row.get("period") || "",
          description: row.get("description") || row.get("details") || "",
        });
      });
    }

    // Fetch Projects
    const projSheet = doc.sheetsByTitle["Projects"];
    const projects: Project[] = [];
    if (projSheet) {
      const projRows = await projSheet.getRows();
      projRows.forEach((row) => {
        const techString = row.get("tech") || row.get("technologies") || "";
        const tech = techString
          ? techString.split(",").map((t: string) => t.trim())
          : [];

        projects.push({
          title: row.get("title") || "",
          date: row.get("date") || "",
          description: row.get("description") || row.get("details") || "",
          tech: tech,
          image: row.get("image") || "https://picsum.photos/800/600?grayscale",
          cover_image: row.get("cover_image") || "",
          link: row.get("link") || "",
        });
      });
    }

    // Fetch Awards
    const awardSheet = doc.sheetsByTitle["Awards"];
    const awards: Award[] = [];
    if (awardSheet) {
      const awardRows = await awardSheet.getRows();
      awardRows.forEach((row) => {
        awards.push({
          title: row.get("title") || "",
          date: row.get("date") || "",
          place: row.get("place") || "",
          description: row.get("description") || row.get("details") || "",
        });
      });
    }

    // Fetch Skills
    const skillSheet = doc.sheetsByTitle["Skills"];
    const skills = {
      languages: [] as string[],
      frameworks: [] as string[],
      tools: [] as string[],
    };

    if (skillSheet) {
      const skillRows = await skillSheet.getRows();
      skillRows.forEach((row) => {
        const category = row.get("category");
        const name = row.get("name");
        if (category && name) {
          switch (category.toLowerCase()) {
            case "language":
            case "languages":
              skills.languages.push(name);
              break;
            case "framework":
            case "frameworks":
              skills.frameworks.push(name);
              break;
            case "tool":
            case "tools":
              skills.tools.push(name);
              break;
          }
        }
      });
    }

    return {
      name: bioData.name || "",
      role: bioData.role || "",
      location: bioData.location || "",
      email: bioData.email || "",
      phone: bioData.phone || "",
      site: bioData.site || "",
      summary: bioData.summary || "",
      experience,
      projects,
      awards,
      skills,
      socials: {
        github: bioData.github || "",
        linkedin: bioData.linkedin || "",
        twitter: bioData.twitter || "",
        instagram: bioData.instagram || "",
      },
    };
  } catch (error) {
    console.error("Error fetching user data from Google Sheets:", error);
    return null;
  }
};
