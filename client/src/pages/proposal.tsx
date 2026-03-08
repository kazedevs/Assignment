import { useState } from "react";
import { generateProposal } from "../services/api";

export default function ProposalPage() {
    const [budget, setBudget] = useState("");
    const [useCase, setUseCase] = useState("");
    const [companySize, setCompanySize] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!budget || !useCase || !companySize) {
                alert("Budget, use case, and company size are required");
                setLoading(false);
                return;
            }
            const data = await generateProposal({
                budget: Number(budget),
                useCase,
                companySize: Number(companySize)
            });
            setResult(data);
        } catch (error) {
            console.error("Error generating proposal:", error);
            alert("Failed to create proposal");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto py-12 px-4 space-y-10">
            {/* Header */}
            <div>
                <h2 className="text-lg font-medium text-gray-900">Generate Proposal</h2>
            </div>

            {/* Form */}
            <div className="space-y-5">
                <div className="space-y-1.5">
                    <label htmlFor="budget" className="text-sm text-gray-600">Budget ($)</label>
                    <input
                        id="budget"
                        type="number"
                        placeholder="e.g., 5000"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        disabled={loading}
                        className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:bg-white transition disabled:opacity-50"
                    />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="useCase" className="text-sm text-gray-600">Use Case</label>
                    <input
                        id="useCase"
                        type="text"
                        placeholder="e.g., E-commerce Platform"
                        value={useCase}
                        onChange={(e) => setUseCase(e.target.value)}
                        disabled={loading}
                        className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:bg-white transition disabled:opacity-50"
                    />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="companySize" className="text-sm text-gray-600">Company Size (employees)</label>
                    <input
                        id="companySize"
                        type="number"
                        placeholder="e.g., 50"
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                        disabled={loading}
                        className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:bg-white transition disabled:opacity-50"
                    />
                </div>

                <div className="flex gap-3 pt-1">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Processing..." : "Generate Proposal"}
                    </button>
                </div>
            </div>

            {/* Result */}
            {result && (
                <div className="space-y-4 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Result</p>

                    {result.products?.length > 0 && (
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 mb-2">Recommended Products</p>
                            {result.products.map((p: { name: string; quantity: number; cost: number }, idx: number) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-700">{p.name}</span>
                                    <div className="flex gap-4 text-sm text-gray-400">
                                        <span>×{p.quantity}</span>
                                        <span className="text-gray-900 font-medium">${p.cost}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-500">Total</span>
                        <span className="text-xl font-semibold text-gray-900">${result.total_cost}</span>
                    </div>

                    {result.impact_summary && (
                        <div className="pt-1">
                            <p className="text-xs text-gray-400 mb-2">Impact Summary</p>
                            <p className="text-sm text-gray-600 leading-relaxed">{result.impact_summary}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}