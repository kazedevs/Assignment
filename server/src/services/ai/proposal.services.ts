import { openrouter } from "../../../utils/openrouter";
import { prisma } from "../../../utils/prisma";

export const generateProposalAI = async (
    budget: number,
    useCase: string,
    companySize: number
) => {
    const prompt = `
Generate a sustainable B2B proposal.

Return ONLY JSON.

{
 "products": [
   {
     "name": "",
     "quantity": 0,
     "cost": 0
   }
 ],
 "total_cost": 0,
 "impact_summary": ""
}

Budget: ${budget}
Use Case: ${useCase}
Company Size: ${companySize}
`;
    console.log("Proposal prompt:", prompt);
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
    console.log("Parsed Result:", parsed);

   try {
     const savedProposal = await prisma.proposal.create({
          data: {
              budget,
              useCase,
              companySize,
              proposalData: parsed
          }
     });
     console.log("Proposal saved successfully:", savedProposal.id);

     await prisma.aiLog.create({
      data: {
          module: "proposal",
          prompt,
          response: parsed
      }
     });
   } catch (saveError) {
     console.error("Error saving proposal to database:", saveError);
     throw saveError;
   }

   return parsed;

}