import { type Request, type Response } from "express";
import { generateCategoryAI } from "../services/ai/category.services";
import { generateProposalAI } from "../services/ai/proposal.services";

export const generateCategory = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if(!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }

    const result = await generateCategoryAI(title, description);

    res.json(result);

  } catch (error) {
    console.error("Error generating category:", error);
    res.status(500).json({ message: "Error generating category" });
  }
};

export const generateProposal = async (req: Request, res: Response) => {
  try {
    const { budget, useCase, companySize } = req.body;

    if(!budget || !useCase || !companySize) {
        return res.status(400).json({ message: "Budget, use case, and company size are required" });
    }

    const result = await generateProposalAI(budget, useCase, companySize);
    res.json(result);

  } catch (error) {
    console.error("Error generating proposal:", error);
    res.status(500).json({ message: "Error generating proposal", error: error instanceof Error ? error.message : "Unknown error" });
  }
};