
'use client';

import { useRef, useState } from 'react';
import styles from './styles/addEntity.module.css';
import { FileSpreadsheet } from 'lucide-react';
import { useApiFetch } from '@/lib/api';

type ApiResponse = {
    success: boolean;
    message?: string;
};

type AddEntityProp = {
    fileUploadUrl?: string;
    uploadEntityUrl?: string;
    title?: string;
    description?: string
};

const AddEntity = ({
    fileUploadUrl = "/students/register-many-students",
    title = "Create new student",
    description = "Register new student into the system"
}: AddEntityProp) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isManualUploadSelected, setManualUpload] = useState<boolean>(true);
    const fileSubmmisionRef = useRef(null);
    const apiFetch = useApiFetch();
    const apiFetchRef = useRef(apiFetch);
    apiFetchRef.current = apiFetch;


    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        setMessage("");
        setSelectedFile(null);

        if (!file) return;

        const validExtension = file.name.toLowerCase().endsWith(".xlsx");

        if (!validExtension) {
            setMessage("Please select an Excel (.xlsx) file.");
            event.target.value = "";
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setMessage("The file must not exceed 5 MB.");
            event.target.value = "";
            return;
        }

        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select a file first.");
            return;
        }

        try {
            setUploading(true);
            setMessage("");

            const formData = new FormData();
            formData.append("students", selectedFile);

            const response = await apiFetchRef.current(fileUploadUrl, {
                method: 'POST',
                body: formData
            });

            const result: ApiResponse = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to import students."
                );
            }

            setMessage("Students imported successfully.");
            setSelectedFile(null);

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

                <div className={styles.uploadFileContainer} ref={fileSubmmisionRef} onClick={
                    () => {
                        setManualUpload(false)
                    }}>
                    <div className={styles.descriptionOfBulkUpload}>
                        Upload excel file
                    </div>
                    <div className={styles.fileInnerContainer}>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileChange}
                            placeholder='Choose a file or drag and drop here.'
                        />

                        {selectedFile && (
                            <div className={styles.selectedFile}>
                                <FileSpreadsheet color='#049c49' />  {selectedFile.name}
                                {" "}({(selectedFile.size / 1024).toFixed(1)} KB)
                            </div>
                        )}

                        {message && <p role="status">{message}</p>}



                    </div>
                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={!selectedFile || uploading || isManualUploadSelected}
                        className={styles.uploadFileButton}
                    >
                        {uploading ? "Uploading..." : "Upload students"}
                    </button>
                </div>


            </div>
        </div>
    );
};

export default AddEntity;
