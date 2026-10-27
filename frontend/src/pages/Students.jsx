import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
Search,
Plus,
MoreHorizontal,
Eye,
Pencil,
Trash2,
ChevronLeft,
ChevronRight,
Users
} from 'lucide-react';

import { api } from '../services/api';
import Loader from '../components/Loader';
import StudentForm from '../components/StudentForm';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';

export default function Students() {

```
// Authentication
const { user } = useAuth();


// State Management
const [data, setData] = useState({
    students: [],
    pagination: {
        page: 1,
        pages: 1,
        total: 0
    }
});

const [search, setSearch] = useState('');
const [page, setPage] = useState(1);
const [busy, setBusy] = useState(true);
const [saving, setSaving] = useState(false);
const [form, setForm] = useState(null);
const [toast, setToast] = useState(null);
const [menu, setMenu] = useState(null);


// Load Student Records
const load = useCallback(async () => {

    setBusy(true);

    try {

        const response = await api(
            `/students?page=${page}&limit=8&search=${encodeURIComponent(search)}`
        );

        setData(response);

    } catch (e) {

        setToast({
            type: 'error',
            message: e.message
        });

    } finally {

        setBusy(false);

    }

}, [page, search]);


// Search Debouncing and Data Fetching
useEffect(() => {

    const t = setTimeout(load, search ? 250 : 0);

    return () => clearTimeout(t);

}, [load]);


// Add or Update Student
const save = async (values) => {

    setSaving(true);

    try {

        await api(
            form
                ? `/students/${form._id}`
                : '/students',
            {
                method: form ? 'PUT' : 'POST',
                body: JSON.stringify(values)
            }
        );

        setToast({
            message: form
                ? 'Student updated successfully.'
                : 'Student added successfully.'
        });

        setForm(null);

        load();

    } catch (e) {

        setToast({
            type: 'error',
            message: e.message
        });

    } finally {

        setSaving(false);

    }

};


// Delete Student Record
const remove = async (s) => {

    if (
        !confirm(
            `Delete ${s.firstName} ${s.lastName}? This cannot be undone.`
        )
    ) {
        return;
    }

    try {

        await api(
            `/students/${s._id}`,
            {
                method: 'DELETE'
            }
        );

        setToast({
            message: 'Student record deleted.'
        });

        load();

    } catch (e) {

        setToast({
            type: 'error',
            message: e.message
        });

    }

    setMenu(null);

};


// Students Directory UI
return (

    <>

        {/* Page Title and Add Student Button */}
        <div className="page-title-row">

            <div>

                <span className="eyebrow">
                    DIRECTORY / RECORDS
                </span>

                <h1>
                    Student directory
                </h1>

                <p>
                    Manage student information and academic records.
                </p>

            </div>

            <button
                className="btn primary"
                onClick={() => setForm({})}
            >

                <Plus size={17} />

                Add student

            </button>

        </div>


        {/* Student Directory Panel */}
        <section className="panel directory-panel">


            {/* Directory Toolbar */}
            <div className="directory-toolbar">

                <div className="directory-count">

                    <b>
                        {data.pagination.total}
                    </b>

                    <span>
                        student records
                    </span>

                </div>


                {/* Search Input */}
                <div className="search-box directory-search">

                    <Search size={17} />

                    <input
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search students..."
                    />

                    {search && (

                        <button onClick={() => setSearch('')}>
                            Clear
                        </button>

                    )}

                </div>

            </div>


            {/* Loading State */}
            {busy ? (

                <Loader label="Loading student records" />

            ) : data.students.length ? (

                // Student Records Table
                <div className="table-scroll">

                    <table>

                        {/* Table Header */}
                        <thead>

                            <tr>

                                <th>STUDENT</th>
                                <th>STUDENT ID</th>
                                <th>PROGRAM</th>
                                <th>ENROLLED</th>
                                <th>STATUS</th>
                                <th></th>

                            </tr>

                        </thead>


                        {/* Table Body */}
                        <tbody>

                            {data.students.map(s => (

                                <tr key={s._id}>

                                    {/* Student Information */}
                                    <td>

                                        <div className="table-person">

                                            <div className="student-avatar">

                                                {s.firstName?.[0]}
                                                {s.lastName?.[0]}

                                            </div>

                                            <div>

                                                <b>
                                                    {s.firstName} {s.lastName}
                                                </b>

                                                <small>
                                                    {s.email}
                                                </small>

                                            </div>

                                        </div>

                                    </td>


                                    {/* Student ID */}
                                    <td className="mono">
                                        {s.studentId}
                                    </td>


                                    {/* Course and Department */}
                                    <td>

                                        <b className="course-name">
                                            {s.course}
                                        </b>

                                        <small className="table-sub">
                                            {s.department}
                                        </small>

                                    </td>


                                    {/* Enrollment Date */}
                                    <td>
                                        {new Date(
                                            s.enrollmentDate
                                        ).toLocaleDateString()}
                                    </td>


                                    {/* Student Status */}
                                    <td>

                                        <span
                                            className={`badge ${
                                                s.status === 'Active'
                                                    ? 'badge-green'
                                                    : s.status === 'Graduated'
                                                        ? 'badge-violet'
                                                        : 'badge-amber'
                                            }`}
                                        >
                                            {s.status}
                                        </span>

                                    </td>


                                    {/* Action Menu */}
                                    <td className="action-cell">

                                        <button
                                            className="icon-btn"
                                            onClick={() =>
                                                setMenu(
                                                    menu === s._id
                                                        ? null
                                                        : s._id
                                                )
                                            }
                                        >

                                            <MoreHorizontal size={19} />

                                        </button>


                                        {/* Dropdown Actions */}
                                        {menu === s._id && (

                                            <div className="row-menu">

                                                {/* View Profile */}
                                                <Link to={`/students/${s._id}`}>

                                                    <Eye size={15} />

                                                    View profile

                                                </Link>


                                                {/* Edit Student */}
                                                <button
                                                    onClick={() => {
                                                        setForm(s);
                                                        setMenu(null);
                                                    }}
                                                >

                                                    <Pencil size={15} />

                                                    Edit record

                                                </button>


                                                {/* Delete - Admin Only */}
                                                {user?.role === 'admin' && (

                                                    <button
                                                        className="danger-text"
                                                        onClick={() => remove(s)}
                                                    >

                                                        <Trash2 size={15} />

                                                        Delete

                                                    </button>

                                                )}

                                            </div>

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            ) : (

                // Empty State
                <div className="empty-state">

                    <Users size={30} />

                    <b>
                        {search
                            ? 'No matching students'
                            : 'Your directory is ready'}
                    </b>

                    <span>
                        {search
                            ? 'Try a different search term.'
                            : 'Add your first student record to populate this directory.'}
                    </span>

                    {!search && (

                        <button
                            className="btn primary"
                            onClick={() => setForm({})}
                        >

                            <Plus size={16} />

                            Add student

                        </button>

                    )}

                </div>

            )}


            {/* Table Footer and Pagination */}
            <div className="table-footer">

                <span>

                    Showing {
                        data.students.length
                            ? (page - 1) * 8 + 1
                            : 0
                    }

                    –

                    {Math.min(
                        page * 8,
                        data.pagination.total
                    )}

                    {' '}of {data.pagination.total}

                </span>


                {/* Pagination Controls */}
                <div className="pagination">

                    {/* Previous Page */}
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(p => p - 1)}
                    >

                        <ChevronLeft size={16} />

                    </button>


                    {/* Current Page */}
                    <span>
                        Page {page} of {
                            Math.max(1, data.pagination.pages)
                        }
                    </span>


                    {/* Next Page */}
                    <button
                        disabled={page >= data.pagination.pages}
                        onClick={() => setPage(p => p + 1)}
                    >

                        <ChevronRight size={16} />

                    </button>

                </div>

            </div>

        </section>


        {/* Add / Edit Student Form */}
        {form !== null && (

            <StudentForm
                initial={form._id ? form : null}
                onSubmit={save}
                onClose={() => setForm(null)}
                busy={saving}
            />

        )}


        {/* Toast Notifications */}
        <Toast
            toast={toast}
            onClose={() => setToast(null)}
        />

    </>

);
```

}

