import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
ArrowLeft,
Mail,
Phone,
MapPin,
CalendarDays,
GraduationCap,
Hash,
Pencil
} from 'lucide-react';

import { api } from '../services/api';
import Loader from '../components/Loader';
import StudentForm from '../components/StudentForm';

export default function StudentProfile() {

```
// Get Student ID from URL
const { id } = useParams();


// State Management
const [student, setStudent] = useState(null);
const [busy, setBusy] = useState(true);
const [form, setForm] = useState(false);
const [saving, setSaving] = useState(false);
const [error, setError] = useState('');


// Load Student Details
const load = () => {

    api(`/students/${id}`)
        .then(d => setStudent(d.student))
        .catch(e => setError(e.message))
        .finally(() => setBusy(false));

};


// Fetch Student Data on Component Load
useEffect(() => {

    load();

}, [id]);


// Save Updated Student Information
const save = async (values) => {

    setSaving(true);

    try {

        const d = await api(
            `/students/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(values)
            }
        );

        setStudent(d.student);
        setForm(false);

    } catch (e) {

        setError(e.message);

    } finally {

        setSaving(false);

    }

};


// Loading State
if (busy) {
    return <Loader />;
}


// Error State
if (error) {

    return (

        <div className="panel empty-state">

            <b>{error}</b>

            <Link to="/students" className="text-link">
                Return to directory
            </Link>

        </div>

    );

}


// Student Profile UI
return (

    <>

        {/* Back Navigation */}
        <Link to="/students" className="back-link">

            <ArrowLeft size={16} />

            Back to directory

        </Link>


        {/* Student Profile Header */}
        <div className="profile-hero panel">

            {/* Student Avatar */}
            <div className="profile-large-avatar">

                {student.firstName?.[0]}
                {student.lastName?.[0]}

            </div>


            {/* Student Basic Information */}
            <div className="profile-hero-info">

                <span className="eyebrow">
                    STUDENT PROFILE
                </span>

                <h1>
                    {student.firstName} {student.lastName}
                </h1>

                <p>
                    {student.course} · {student.department}
                </p>


                {/* Student Tags */}
                <div className="profile-tags">

                    <span className="mono">
                        {student.studentId}
                    </span>

                    <span
                        className={`badge ${
                            student.status === 'Active'
                                ? 'badge-green'
                                : student.status === 'Graduated'
                                    ? 'badge-violet'
                                    : 'badge-amber'
                        }`}
                    >
                        {student.status}
                    </span>

                </div>

            </div>


            {/* Edit Profile Button */}
            <button
                className="btn secondary profile-edit"
                onClick={() => setForm(true)}
            >

                <Pencil size={16} />

                Edit profile

            </button>

        </div>


        {/* Student Profile Information Grid */}
        <div className="profile-grid">


            {/* Personal Information */}
            <section className="panel detail-panel">

                <span className="eyebrow">
                    PERSONAL INFORMATION
                </span>

                <h3>
                    Contact details
                </h3>


                {/* Email Address */}
                <div className="detail-line">

                    <Mail />

                    <div>

                        <small>
                            Email address
                        </small>

                        <b>
                            {student.email}
                        </b>

                    </div>

                </div>


                {/* Phone Number */}
                <div className="detail-line">

                    <Phone />

                    <div>

                        <small>
                            Phone number
                        </small>

                        <b>
                            {student.phone || 'Not provided'}
                        </b>

                    </div>

                </div>


                {/* Address */}
                <div className="detail-line">

                    <MapPin />

                    <div>

                        <small>
                            Address
                        </small>

                        <b>
                            {student.address || 'Not provided'}
                        </b>

                    </div>

                </div>

            </section>


            {/* Academic Information */}
            <section className="panel detail-panel">

                <span className="eyebrow">
                    ACADEMIC INFORMATION
                </span>

                <h3>
                    Enrollment details
                </h3>


                {/* Course Information */}
                <div className="detail-line">

                    <GraduationCap />

                    <div>

                        <small>
                            Program / Course
                        </small>

                        <b>
                            {student.course}
                        </b>

                    </div>

                </div>


                {/* Department Information */}
                <div className="detail-line">

                    <Hash />

                    <div>

                        <small>
                            Department
                        </small>

                        <b>
                            {student.department}
                        </b>

                    </div>

                </div>


                {/* Enrollment Date */}
                <div className="detail-line">

                    <CalendarDays />

                    <div>

                        <small>
                            Enrollment date
                        </small>

                        <b>
                            {new Date(
                                student.enrollmentDate
                            ).toLocaleDateString(
                                undefined,
                                {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                }
                            )}
                        </b>

                    </div>

                </div>

            </section>


            {/* Additional Information / Notes */}
            <section className="panel detail-panel notes-panel">

                <span className="eyebrow">
                    INTERNAL NOTES
                </span>

                <h3>
                    Additional information
                </h3>

                <p>
                    {student.notes ||
                        'No internal notes have been added for this student.'}
                </p>

                <small className="muted">
                    Record created {new Date(
                        student.createdAt
                    ).toLocaleString()}
                </small>

            </section>

        </div>


        {/* Edit Student Modal / Form */}
        {form && (

            <StudentForm
                initial={student}
                onSubmit={save}
                onClose={() => setForm(false)}
                busy={saving}
            />

        )}

    </>

);
```

}
