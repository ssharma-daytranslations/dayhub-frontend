"use client";

import { useState, useEffect } from "react";

export default function InterpretersManager() {
    const [interpreters, setInterpreters] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchInterpreters = async () => {
        const res = await fetch("/api/interpreters");
        const data = await res.json();
        if (Array.isArray(data)) {
            setInterpreters(data);
        }
    };

    useEffect(() => {
        fetchInterpreters();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/interpreters", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });
            if (res.ok) {
                setName("");
                setEmail("");
                fetchInterpreters();
            } else {
                alert("Failed to create interpreter");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Interpreters CRUD Demo</h2>

            <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-md">
                <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:border-blue-500"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:border-blue-500"
                        placeholder="john@example.com"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Interpreter"}
                </button>
            </form>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">List of Interpreters</h3>
                {interpreters.length === 0 ? (
                    <p className="text-gray-400">No interpreters found.</p>
                ) : (
                    <ul className="space-y-2">
                        {interpreters.map((interp) => (
                            <li key={interp.id} className="p-3 bg-gray-800 rounded flex justify-between items-center bg-opacity-50">
                                <span>{interp.name} <span className="text-gray-400 text-sm">({interp.email})</span></span>
                                <span className="text-xs text-gray-500">ID: {interp.id}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
