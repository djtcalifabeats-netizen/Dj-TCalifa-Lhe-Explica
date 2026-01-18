
import { GoogleGenAI } from "@google/genai";
import { GroundingSource } from "../types";

export const searchMusicInfo = async (query: string): Promise<{ text: string, sources: GroundingSource[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Forneça informações detalhadas e recentes sobre o artista ou gênero musical: ${query}. Fale sobre a história, sucessos e impacto cultural.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "Não foi possível encontrar informações.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources: GroundingSource[] = chunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title || "Fonte externa",
        uri: chunk.web?.uri || "#"
      }));

    return { text, sources };
  } catch (error) {
    console.error("Gemini search error:", error);
    return { 
      text: "Erro ao realizar a busca. Verifique sua conexão ou tente novamente mais tarde.", 
      sources: [] 
    };
  }
};
