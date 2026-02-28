import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getDetailedClinicInfo() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Pronađi detaljne informacije o stomatološkoj ordinaciji Kalident u Beogradu. Potrebni su mi: tačna adresa, brojevi telefona, radno vreme, Instagram profil, Facebook profil, spisak specifičnih usluga koje nude, i ako postoji, ime osnivača ili glavnog doktora. Takođe, nađi kratak 'O nama' tekst koji se koristi na njihovim mrežama. Odgovori na srpskom jeziku u JSON formatu.",
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json"
    },
  });

  return JSON.parse(response.text);
}
