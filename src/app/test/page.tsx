import InterpretersManager from "@/components/InterpretersManager";

export default function TestPage() {
    return (
        <div className="min-h-screen bg-black text-white p-10">
            <h1 className="text-3xl font-bold mb-10 text-center">Backend Integration Test</h1>
            <div className="max-w-4xl mx-auto">
                <InterpretersManager />
            </div>
        </div>
    );
}
