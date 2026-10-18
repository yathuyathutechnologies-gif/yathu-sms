
'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './styles/addEntity.module.css';
import { File, FileSpreadsheet } from 'lucide-react';
import { useApiFetch } from '@/lib/api';
import gsap from 'gsap';

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
    title?:string;
    description?:string
};

const AddEntity = ({
    inputFields = [
        {
            fieldName: 'firstName',
            label: 'First name',
            inputType: 'text',
            placeholder: 'Enter first name',
            required: true,
        },
        {
            fieldName: 'lastName',
            label: 'Last name',
            inputType: 'text',
            placeholder: 'Enter last name',
            required: true,
        },
        {
            fieldName: 'email',
            label: 'Email address',
            inputType: 'email',
            placeholder: 'Enter email address',
            required: false,
        },
        {
            fieldName: 'phoneNumber',
            label: 'Phone number',
            inputType: 'tel',
            placeholder: 'Enter phone number',
            required: true,
        },
        {
            fieldName: 'dateOfBirth',
            label: 'Date of birth',
            inputType: 'date',
            placeholder: '',
            required: true,
        }, {
            fieldName: 'sex',
            label: 'Sex',
            inputType: 'dropDown',
            placeholder: 'Select sex',
            required: true,
            options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
            ],
        },
        {
            fieldName: 'registrationNumber',
            label: 'Registration number',
            inputType: 'text',
            placeholder: '',
            required: true,
        },
        {
            fieldName: 'programName',
            label: 'Program',
            inputType: 'text',
            placeholder: '',
            required: true,
        },
    ],
    uploadEntityUrl = "/students/register-student",
    title = "Create new student",
    description = "Register new student into the system"
}: AddEntityProp) => {

    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isManualUploadSelected, setManualUpload] = useState<boolean>(true);
    const manualSubmissionRef = useRef(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInputChange = (event: React.FormEvent<HTMLFormElement>) => {
        setIsFormValid(event.currentTarget.checkValidity());
    };

    const apiFetch = useApiFetch();
    const apiFetchRef = useRef(apiFetch);
    apiFetchRef.current = apiFetch;


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        formData.append("role", "student");
        formData.append("password", "student1234");
        formData.append("enrollmentStatus", "enrolled");
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

            setMessage("Students imported successfully.");

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
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
                <form onSubmit={handleSubmit} ref={manualSubmissionRef} onClick={
                    () => {
                        setManualUpload(true)
                    }
                }
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
                            disabled={!isManualUploadSelected || !isFormValid || !uploading}
                        >
                            Register student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEntity;
