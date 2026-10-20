'use client';

import AddEntity from '@/components/ui/addEntity';

const AddStudentsPage = () => {
    return (
        <div>
            <AddEntity
                title={"Create new student"}
                description={"Register new student into the system"}
                uploadEntityUrl={"/students/register-student"}
                buttonText={'Register student'}
                inputFields={[
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
                ]} />
        </div>
    );
}
export default AddStudentsPage;