'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useFormContext } from '../context/form-context';
import ProgressBar from '@/Component/ProgressBar';


const schema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

export default function Step1() {
    const router = useRouter();
    const { data, updateFormData } = useFormContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: data.fullName || '',
            email: data.email || '',
            phone: data.phone || '',
        },
    });

    const onSubmit = (values) => {
        console.log('Step 1 Data:', values);
        updateFormData(values);
        router.push('/step2');
    };

    return (
        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[30%] mx-auto mt-10 px-4 p-6 bg-dark shadow rounded">
            <ProgressBar currentStep={1} />
            <h1 className="text-3xl text-center font-bold mb-4">Personal Information</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        {...register('fullName')}
                        className="w-full border bg-white text-black px-3 py-2 rounded"
                        placeholder="John Doe"
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        {...register('email')}
                        className="w-full  bg-white text-black border px-3 py-2 rounded"
                        placeholder="john@example.com"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                        {...register('phone')}
                        className="w-full  bg-white text-black border px-3 py-2 rounded"
                        placeholder="1234567890"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone.message}</p>
                    )}
                </div>

                <div className="pt-4 text-end">
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
