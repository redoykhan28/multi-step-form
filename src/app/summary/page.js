'use client';

import { useFormContext } from '../context/form-context';
import { useRouter } from 'next/navigation';

export default function Summary() {
    const { data } = useFormContext();
    const router = useRouter();

    const handleSubmit = () => {
        // Get existing submissions
        const existing = JSON.parse(localStorage.getItem('submissions') || '[]');

        // Add new submission
        const updated = [...existing, data];

        // Save to localStorage
        localStorage.setItem('submissions', JSON.stringify(updated));

        // Log in console
        console.log('Form submitted successfully:', data);

        // Optional: Redirect or reset state
        alert('Form submitted successfully!');
        router.push('/');
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-dark shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Summary</h1>

            <div className="space-y-4">
                {/* Personal Info */}
                <div>
                    <h2 className="font-semibold mb-1">Personal Information</h2>
                    <p><strong>Full Name:</strong> {data.fullName}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Phone:</strong> {data.phone}</p>
                </div>

                {/* Address */}
                <div>
                    <h2 className="font-semibold mb-1">Address Details</h2>
                    <p><strong>Street:</strong> {data.street}</p>
                    <p><strong>City:</strong> {data.city}</p>
                    <p><strong>Zip Code:</strong> {data.zip}</p>
                </div>

                {/* Account Setup */}
                <div>
                    <h2 className="font-semibold mb-1">Account Setup</h2>
                    <p><strong>Username:</strong> {data.username}</p>
                    <p><strong>Password:</strong> {'*'.repeat(data.password?.length || 6)}</p>
                </div>
            </div>

            <div className="pt-6">
                <button
                    onClick={handleSubmit}
                    className="text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
