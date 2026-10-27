import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, ShieldCheck } from 'lucide-react';

import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ mode }) {

```
// Determine authentication mode
const register = mode === 'register';

// Form states
const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
});

const [error, setError] = useState('');
const [busy, setBusy] = useState(false);

// Authentication and navigation
const { authenticate } = useAuth();
const nav = useNavigate();


// Handle form submission
const submit = async (e) => {
    e.preventDefault();

    setBusy(true);
    setError('');

    try {
        const d = await api(
            `/auth/${register ? 'register' : 'login'}`,
            {
                method: 'POST',
                body: JSON.stringify(form)
            }
        );

        authenticate(d);
        nav('/');

    } catch (err) {
        setError(err.message);

    } finally {
        setBusy(false);
    }
};


// Component UI
return (
    <div className="auth-screen">

        {/* Left Visual Section */}
        <div className="auth-visual">

            <div className="auth-brand">
                <div className="brand-mark">
                    <GraduationCap />
                </div>

                <b>DEVIXO</b>
            </div>

            <div className="auth-copy">

                <span className="eyebrow">
                    STUDENT SERVICES PLATFORM
                </span>

                <h1>
                    Clarity for every
                    <br />
                    <i>student journey.</i>
                </h1>

                <p>
                    A considered workspace for the people shaping tomorrow.
                    Keep student records organized, accessible, and secure.
                </p>

                <div className="auth-trust">
                    <ShieldCheck size={18} />
                    Built for focused academic administration
                </div>

            </div>

            <div className="auth-image-credit">
                A better view of student success
            </div>

        </div>


        {/* Right Authentication Section */}
        <div className="auth-panel">

            <div className="auth-form-wrap">

                {/* Mobile Branding */}
                <div className="mobile-brand">

                    <div className="brand-mark">
                        <GraduationCap />
                    </div>

                    <b>DEVIXO</b>

                </div>


                {/* Form Heading */}
                <span className="eyebrow">
                    {register ? 'GET STARTED' : 'WELCOME BACK'}
                </span>

                <h2>
                    {register
                        ? 'Create your workspace account'
                        : 'Sign in to your workspace'}
                </h2>

                <p className="muted">
                    {register
                        ? 'Register as a staff member to manage student records.'
                        : 'Enter your credentials to continue to the dashboard.'}
                </p>


                {/* Authentication Form */}
                <form onSubmit={submit}>

                    {/* Full Name - Registration Only */}
                    {register && (
                        <label className="field">

                            <span>Full name</span>

                            <input
                                type="text"
                                required
                                value={form.name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        name: e.target.value
                                    })
                                }
                                placeholder="Your full name"
                            />

                        </label>
                    )}


                    {/* Email Field */}
                    <label className="field">

                        <span>Work email</span>

                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }
                            placeholder="name@institution.edu"
                        />

                    </label>


                    {/* Password Field */}
                    <label className="field">

                        <span>Password</span>

                        <input
                            type="password"
                            minLength="8"
                            required
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value
                                })
                            }
                            placeholder="At least 8 characters"
                        />

                    </label>


                    {/* Error Message */}
                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}


                    {/* Submit Button */}
                    <button
                        className="btn primary auth-submit"
                        disabled={busy}
                    >

                        {busy
                            ? 'Please wait...'
                            : register
                                ? 'Create account'
                                : 'Sign in'}

                        <ArrowRight size={17} />

                    </button>

                </form>


                {/* Login / Registration Navigation */}
                <p className="auth-switch">

                    {register
                        ? 'Already have an account?'
                        : 'New to the workspace?'}

                    {' '}

                    <Link to={register ? '/login' : '/register'}>
                        {register ? 'Sign in' : 'Create account'}
                    </Link>

                </p>


                {/* Footer */}
                <div className="auth-foot">
                    © {new Date().getFullYear()} Devixo Solutions
                </div>

            </div>

        </div>

    </div>
);
```

}
