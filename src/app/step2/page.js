'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useFormContext } from '../context/form-context';
import ProgressBar from '@/Component/ProgressBar';

const schema = z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    zip: z.string().min(5, 'Zip code must be at least 5 digits').regex(/^\d+$/, 'Zip code must contain only numbers'),
});

export default function Step2() {
    const router = useRouter();
    const { data, updateFormData } = useFormContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            street: data.street || '',
            city: data.city || '',
            zip: data.zip || '',
        },
    });

    const onSubmit = (values) => {
        console.log('Step 2 Data:', values);
        updateFormData(values);
        router.push('/step3');
    };

    return (
        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[30%] mx-auto mt-10 px-4 p-6 bg-dark shadow rounded">            <ProgressBar currentStep={2} />
            <h1 className="text-2xl text-center font-bold mb-4">Address Details</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Street Address */}
                <div>
                    <label className="block text-sm font-medium mb-1">Street Address</label>
                    <input
                        {...register('street')}
                        className="w-full  bg-white text-black border px-3 py-2 rounded"
                        placeholder="123 Main St"
                    />
                    {errors.street && (
                        <p className="text-red-500 text-sm">{errors.street.message}</p>
                    )}
                </div>

                {/* City */}
                <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                        {...register('city')}
                        className="w-full  bg-white text-black border px-3 py-2 rounded"
                        placeholder="New York"
                    />
                    {errors.city && (
                        <p className="text-red-500 text-sm">{errors.city.message}</p>
                    )}
                </div>

                {/* Zip Code */}
                <div>
                    <label className="block text-sm font-medium mb-1">Zip Code</label>
                    <input
                        {...register('zip')}
                        className="w-full  bg-white text-black border px-3 py-2 rounded"
                        placeholder="10001"
                    />
                    {errors.zip && (
                        <p className="text-red-500 text-sm">{errors.zip.message}</p>
                    )}
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={() => router.push('/step1')}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Previous
                    </button>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}
