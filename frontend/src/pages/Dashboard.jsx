import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
Users,
UserCheck,
Clock3,
GraduationCap,
ArrowUpRight,
Plus,
Search,
ArrowRight,
ShieldCheck
} from 'lucide-react';

import { api } from '../services/api';
import Loader from '../components/Loader';

export default function Dashboard() {

```
// State Management
const [data, setData] = useState(null);
const [search, setSearch] = useState('');
const [results, setResults] = useState([]);
const [busy, setBusy] = useState(true);


// Fetch Dashboard Statistics
useEffect(() => {

    api('/dashboard/stats')
        .then(setData)
        .finally(() => setBusy(false));

}, []);


// Student Search with Debouncing
useEffect(() => {

    if (!search.trim()) {
        setResults([]);
        return;
    }

    const t = setTimeout(() => {

        api(`/students?search=${encodeURIComponent(search)}&limit=5`)
            .then(d => setResults(d.students))
            .catch(() => setResults([]));

    }, 250);

    return () => clearTimeout(t);

}, [search]);


// Loading State
if (busy) {
    return <Loader label="Preparing your dashboard" />;
}


// Dashboard Statistics
const stats = [
    [
        'Total students',
        data?.stats.total || 0,
        Users,
        'Across all records',
        'blue'
    ],
    [
        'Active students',
        data?.stats.active || 0,
        UserCheck,
        'Currently enrolled',
        'green'
    ],
    [
        'On leave',
        data?.stats.onLeave || 0,
        Clock3,
        'Temporary status',
        'amber'
    ],
    [
        'Graduated',
        data?.stats.graduated || 0,
        GraduationCap,
        'Completed programs',
        'violet'
    ]
];


// Dashboard UI
return (

    <>

        {/* Welcome Section */}
        <div className="welcome-row">

            <div>

                <span className="eyebrow">
                    OVERVIEW / OCTOBER 2026
                </span>

                <h1>
                    Good work starts with <em>clarity.</em>
                </h1>

                <p>
                    Here's what's happening across your student community.
                </p>

            </div>

            <Link to="/students" className="btn primary">
                <Plus size={17} />
                Add student
            </Link>

        </div>


        {/* Hero Banner */}
        <div className="hero-strip">

            <div>

                <span className="hero-kicker">
                    STUDENT SERVICES · CONTROL CENTER
                </span>

                <h2>
                    Every record, <span>in its right place.</span>
                </h2>

                <p>
                    Manage your student directory with confidence
                    and keep your team in sync.
                </p>

                <Link to="/students" className="hero-link">
                    Explore student directory
                    <ArrowRight size={16} />
                </Link>

            </div>


            {/* Hero Graphic */}
            <div className="hero-art">

                <div className="hero-orbit orbit-one" />
                <div className="hero-orbit orbit-two" />

                <div className="hero-stat-float">

                    <span>STUDENT COMMUNITY</span>

                    <b>
                        {String(data?.stats.total || 0).padStart(2, '0')}
                    </b>

                    <small>
                        Records in workspace
                    </small>

                </div>

            </div>

        </div>


        {/* Statistics Cards */}
        <div className="stats-grid">

            {stats.map(([title, value, Icon, sub, color]) => (

                <div className="stat-card" key={title}>

                    <div className={`stat-icon ${color}`}>
                        <Icon size={19} />
                    </div>

                    <div className="stat-label">
                        {title}
                    </div>

                    <div className="stat-value">
                        {value.toLocaleString()}
                    </div>

                    <div className="stat-foot">
                        {sub}
                        <ArrowUpRight size={14} />
                    </div>

                </div>

            ))}

        </div>


        {/* Dashboard Content Grid */}
        <div className="dashboard-grid">


            {/* Recent Registrations Section */}
            <section className="panel recent-panel">

                <div className="panel-heading">

                    <div>

                        <span className="eyebrow">
                            LATEST ACTIVITY
                        </span>

                        <h3>
                            Recent registrations
                        </h3>

                    </div>

                    <Link to="/students" className="text-link">
                        View directory
                        <ArrowRight size={15} />
                    </Link>

                </div>


                {/* Recent Students List */}
                {data?.recent?.length ? (

                    <div className="recent-list">

                        {data.recent.map(s => (

                            <div className="recent-item" key={s._id}>

                                <div className="student-avatar">
                                    {s.firstName?.[0]}
                                    {s.lastName?.[0]}
                                </div>

                                <div className="recent-info">

                                    <b>
                                        {s.firstName} {s.lastName}
                                    </b>

                                    <small>
                                        {s.studentId} · {s.course}
                                    </small>

                                </div>


                                {/* Student Status Badge */}
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


                                {/* Registration Date */}
                                <small className="recent-date">
                                    {new Date(s.createdAt).toLocaleDateString()}
                                </small>

                            </div>

                        ))}

                    </div>

                ) : (

                    // Empty State
                    <div className="empty-state">

                        <Users size={28} />

                        <b>
                            No student records yet
                        </b>

                        <span>
                            Add your first student to get started.
                        </span>

                        <Link to="/students" className="text-link">
                            Add a student
                            <ArrowRight size={14} />
                        </Link>

                    </div>

                )}

            </section>


            {/* Quick Student Search Section */}
            <section className="panel search-panel">

                <span className="eyebrow">
                    QUICK FIND
                </span>

                <h3>
                    Find a student
                </h3>

                <p>
                    Search by name, student ID, course, or email.
                </p>


                {/* Search Input */}
                <div className="search-box">

                    <Search size={18} />

                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Start typing to search..."
                    />

                </div>


                {/* Search Results */}
                {search && (

                    <div className="quick-results">

                        {results.length ? (

                            results.map(s => (

                                <Link
                                    to={`/students/${s._id}`}
                                    key={s._id}
                                >

                                    <span>

                                        {s.firstName} {s.lastName}

                                        <small>
                                            {s.studentId} · {s.course}
                                        </small>

                                    </span>

                                    <ArrowUpRight size={16} />

                                </Link>

                            ))

                        ) : (

                            <small className="muted">
                                No matching records found.
                            </small>

                        )}

                    </div>

                )}


                {/* Search Security Information */}
                <div className="search-tip">

                    <ShieldCheck size={17} />

                    <span>
                        Search results are available only to
                        signed-in team members.
                    </span>

                </div>

            </section>

        </div>

    </>

);
```

}

