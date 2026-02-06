import { GoogleGenAI } from "@google/genai";

// This service demonstrates the structure for the "Kairot" project's Gemini integration.
// It is prepared for future implementations where the user provides an API key.

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  /**
   * Generates a technical summary of a resume text.
   * Useful for the "Kairot" Audio-to-Text use case mentioned in CV.
   */
  async summarizeTechnicalContext(text: string): Promise<string> {
    if (!this.ai) throw new Error("API Key not initialized");

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize this technical transcript into bullet points: ${text}`,
        config: {
            thinkingConfig: { thinkingBudget: 0 } // Speed over depth for summaries
        }
      });
      return response.text || "No summary generated.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}