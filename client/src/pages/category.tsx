import React, { useState } from "react"
import { generateCategory } from "../services/api";

export default function CategoryPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!title || !description) {
                alert("Title and description are required");
                setLoading(false);
                return;
            }
            const data = await generateCategory({ title, description });
            setResult(data);
        } catch (error) {
            console.error("Error generating category:", error);
            alert("Failed to create category");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto py-12 px-4 space-y-10">
            <div>
                <h2 className="text-lg font-medium text-gray-900">Product Categorization</h2>
            </div>
            <div className="space-y-5">
                <div className="space-y-1.5">
                    <label htmlFor="title" className="text-sm text-gray-600">Product Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="e.g., Handmade Glass Water Bottle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                        className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:bg-white transition disabled:opacity-50"
                    />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="description" className="text-sm text-gray-600">Description</label>
                    <textarea
                        id="description"
                        placeholder="Describe your product in detail..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={loading}
                        rows={4}
                        className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:bg-white transition resize-none disabled:opacity-50"
                    />
                </div>

                <div className="flex gap-3 pt-1">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Processing..." : "Categorize"}
                    </button>
                </div>
            </div>

            {result && (
                <div className="space-y-3 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Result</p>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500">Category</span>
                            <span className="text-sm font-medium text-gray-900">{result.category}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500">Subcategory</span>
                            <span className="text-sm font-medium text-gray-900">{result.subcategory}</span>
                        </div>
                    </div>

                    {result.seoTags?.length > 0 && (
                        <div className="pt-1">
                            <p className="text-xs text-gray-400 mb-2">SEO Tags</p>
                            <div className="flex flex-wrap gap-1.5">
                                {result.seoTags.map((tag: string, idx: number) => (
                                    <span key={idx} className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {result.sustainabilityFilters?.length > 0 && (
                        <div className="pt-1">
                            <p className="text-xs text-gray-400 mb-2">Sustainability</p>
                            <div className="flex flex-wrap gap-1.5">
                                {result.sustainabilityFilters.map((filter: string, idx: number) => (
                                    <span key={idx} className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                        {filter}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}