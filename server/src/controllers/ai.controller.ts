import express, { type Request, type Response } from "express";


export const generatecategory = async (req: Request, res: Response) => {
    try {
        const { title , description } = req.body;

        //later ai call
        res.json({
            category: "Kitechen",
            subcategory: "Utensils",
            seoTags: ["kitchen", "utensils", "cooking"],

        });
    } catch (error) {
        res.status(500).json({ message: "Error generating category" });
    }
}

export const generateProposal = async (req: Request, res: Response) => {
    try {
        const { budget, useCase, CompanySize } = req.body;

        //later ai call
        res.json({
            product: [
                {
                    name: "Product 1",
                    description: "Description of Product 1",
                    price: "$100"
                },
                {
                    name: "Product 2",
                    description: "Description of Product 2",
                    price: "$200"
                }
            ],
            totalCost: budget,
            impactSummary: "This proposal will help your company achieve its goals by providing the necessary tools and resources to improve efficiency and productivity."
        })
    } catch (error) {
        res.status(500).json({ message: "Error generating proposal" });
    }
}