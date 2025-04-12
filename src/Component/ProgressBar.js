'use client';

export default function ProgressBar({ currentStep }) {
    const steps = [1, 2, 3];

    return (
        <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
                <div className="flex items-center" key={step}>
                    {/* Circle */}
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${currentStep >= step ? 'bg-purple-600 border-purple-600' : 'bg-transparent border-2'
                            }`}
                    >
                        {step}
                    </div>

                    {/* Connector */}
                    {index !== steps.length - 1 && (
                        <div
                            className={`w-10 h-1 ${currentStep > step ? 'bg-purple-600' : 'bg-gray-300'
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
