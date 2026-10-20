
'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './styles/addEntity.module.css';
import { File, FileSpreadsheet } from 'lucide-react';
import { useApiFetch } from '@/lib/api';
import gsap from 'gsap';
import { toast } from 'sonner';

type InputField = {
    fieldName: string;
    label: string;
    inputType: 'text' | 'email' | 'tel' | 'date' | 'dropDown';
    placeholder: string;
    required: boolean;
    options?: {
        label: string;
        value: string;
    }[];
};


type ApiResponse = {
    success: boolean;
    message?: string;
};

type AddEntityProp = {
    inputFields?: InputField[];
    uploadEntityUrl?: string;
    title?: string;
    description?: string
    buttonText: string
};

const AddEntity = ({
    inputFields = [],
    uploadEntityUrl = "",
    title = "",
    description = "",
    buttonText = ""
}: AddEntityProp) => {

    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const manualSubmissionRef = useRef(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef=useRef<HTMLFormElement>(null);

    const handleInputChange = (event: React.FormEvent<HTMLFormElement>) => {
        setIsFormValid(event.currentTarget.checkValidity());
    };

    const apiFetch = useApiFetch();
    const apiFetchRef = useRef(apiFetch);
    apiFetchRef.current = apiFetch;

    console.log(isFormValid, uploading)
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        // formData.append("role", "student");
        // formData.append("password", "student1234");
        // formData.append("enrollmentStatus", "enrolled");

        const studentData = Object.fromEntries(formData.entries());

        console.log(studentData);

        try {
            setUploading(true);


            const response = await apiFetchRef.current(uploadEntityUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentData),
            });

            const result: ApiResponse = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to import students."
                );
            }

            setMessage("created successfully");
            toast.success('created successfully');
            formRef.current?.reset()
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
            toast.error('Failed')
        } finally {
            console.log('form',formRef.current)
            setUploading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.description}>
                {description}
            </div>
            <div className={styles.createOption}>
                <form onSubmit={handleSubmit} ref={formRef}
                    onChange={handleInputChange}
                >
                    <div className={styles.formGrid}>
                        {inputFields.map((field) => (
                            <div
                                key={field.fieldName}
                                className={styles.inputGroup}
                            >
                                <label htmlFor={field.fieldName}>
                                    {field.label}

                                    {field.required && (
                                        <span className={styles.required}>
                                            *
                                        </span>
                                    )}
                                </label>

                                {field.inputType === 'dropDown' ? (
                                    <select
                                        id={field.fieldName}
                                        name={field.fieldName}
                                        required={field.required}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            {field.placeholder}
                                        </option>

                                        {field.options?.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id={field.fieldName}
                                        name={field.fieldName}
                                        type={field.inputType}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className={styles.formActions}>
                        <button type="reset" className={styles.cancelButton}>
                            Clear form
                        </button>

                        <button type="submit" className={styles.submitButton}
                            disabled={!isFormValid || uploading}
                        >
                            {buttonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEntity;
