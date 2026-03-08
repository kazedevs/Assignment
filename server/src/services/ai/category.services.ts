import { openrouter } from "../../../utils/openrouter";
import { prisma } from "../../../utils/prisma";

export const generateCategoryAI = async (
  title: string,
  description: string
) => {

  const prompt = `
Return ONLY valid JSON.

{
 "category": "",
 "subcategory": "",
 "seoTags": [],
 "sustainabilityFilters": []
}

Product Title: ${title}
Description: ${description}
`;

  console.log("Category prompt:", prompt);
  const response = await openrouter.chat.send({
    chatGenerationParams: {
      model: "stepfun/step-3.5-flash:free",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      stream: false
    }
  }); 

  const aiText = response.choices[0]?.message.content;
  console.log("Raw AI Response:", aiText);
  const cleaned = aiText
         .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

const parsed = JSON.parse(cleaned || "{}");
console.log("Parsed result:", parsed);

  await prisma.productCategorization.create({
    data: {
        title,
        description,
        category: parsed.category,
        subcategory: parsed.subcategory,
        sustainability: parsed.sustainabilityFilters || [],
        aiResponse: parsed,
        seoTags: parsed.seoTags || [],
    }
  })

  await prisma.aiLog.create({
    data: {
        module: "category",
        prompt,
        response: parsed
    }
  })

  return parsed;
};