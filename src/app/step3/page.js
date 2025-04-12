'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useFormContext } from '../context/form-context';
import ProgressBar from '@/Component/ProgressBar';

const schema = z
    .object({
        username: z.string().min(4, 'Username must be at least 4 characters'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export default function Step3() {
    const router = useRouter();
    const { data, updateFormData } = useFormContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            username: data.username || '',
            password: data.password || '',
            confirmPassword: data.confirmPassword || '',
        },
    });

    const onSubmit = (values) => {
        console.log('Step 3 Data:', values);
        updateFormData(values);
        router.push('/summary');
    };

    return (
        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[30%] mx-auto mt-10 px-4 p-6 bg-dark shadow rounded">
            <ProgressBar currentStep={3} />
            <h1 className="text-2xl text-center font-bold mb-4">Account Setup</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Username */}
                <div>
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                        {...register('username')}
                        className="w-full  bg-white text-black border px-3 py-2 rounded"
                        placeholder="Username"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block  text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className="w-full  bg-white text-black border px-3 py-2 rounded"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        className="w-full  bg-white text-black border px-3 py-2 rounded"
                        placeholder="Confirm Password"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={() => router.push('/step2')}
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
