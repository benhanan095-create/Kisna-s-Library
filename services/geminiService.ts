import { GoogleGenAI, Type } from "@google/genai";
import { Book } from '../types';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBookRecommendations = async (
  query: string, 
  currentCatalog: Book[]
): Promise<Book[]> => {
  try {
    const model = "gemini-2.5-flash";
    
    // We want the AI to suggest books. 
    // Ideally, we would want it to pick from our catalog, but for a rich experience, 
    // let's ask it to generate recommendations that we *might* have or generate new ones matching the schema.
    // For this demo, we will ask it to generate valid Book objects.

    const response = await ai.models.generateContent({
      model: model,
      contents: `User is looking for books matching this description: "${query}". 
      Recommend 4-6 distinct, real or realistic books that match this query.
      They must have a title, author, description, category, and an estimated price.
      Ensure the response is a valid JSON array matching the schema.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              author: { type: Type.STRING },
              price: { type: Type.NUMBER },
              description: { type: Type.STRING },
              category: { type: Type.STRING },
              rating: { type: Type.NUMBER },
            },
            required: ["title", "author", "price", "description", "category", "rating"]
          }
        }
      }
    });

    const rawBooks = JSON.parse(response.text || "[]");

    // Augment with local IDs and Cover URLs since the AI doesn't know our specific image seeds
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rawBooks.map((b: any, index: number) => ({
      ...b,
      id: `ai-${Date.now()}-${index}`,
      coverUrl: `https://picsum.photos/seed/${b.title.replace(/\s+/g, '')}/300/450`
    }));

  } catch (error) {
    console.error("Failed to get recommendations:", error);
    return [];
  }
};
