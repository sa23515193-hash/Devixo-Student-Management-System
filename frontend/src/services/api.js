// ============================================================
// DEVIXO STUDENT MANAGEMENT SYSTEM
// DEMO DATA SERVICE
// ============================================================
//
// Browser-only storage using localStorage.
// No server or database connection is required.
// Data persists in this browser.
// Clearing site data resets the demo.
//
// ============================================================

// ============================================================
// 1. STORAGE KEYS
// ============================================================

const USERS_KEY = 'devixo_demo_users';
const STUDENTS_KEY = 'devixo_demo_students';
const TOKEN_KEY = 'devixo_token';

// ============================================================
// 2. INITIAL DEMO USERS
// ============================================================

const initialUsers = [

```
{
    id: 'demo-admin-01',
    name: 'Alex Morgan',
    email: 'admin@devixo.demo',
    password: 'Admin123!',
    role: 'admin'
},

{
    id: 'demo-staff-01',
    name: 'Jordan Lee',
    email: 'staff@devixo.demo',
    password: 'Staff123!',
    role: 'staff'
}
```

];

// ============================================================
// 3. INITIAL DEMO STUDENTS
// ============================================================

const initialStudents = [

```
{
    _id: 'st-1001',
    studentId: 'DX-2026-001',
    firstName: 'Olivia',
    lastName: 'Bennett',
    email: 'olivia.bennett@example.com',
    phone: '+1 202 555 0141',
    course: 'Computer Science',
    department: 'Technology',
    enrollmentDate: '2026-09-02',
    status: 'Active',
    address: 'New York, USA',
    notes: 'Interested in web application development.',
    createdAt: '2026-09-02T09:30:00.000Z'
},

{
    _id: 'st-1002',
    studentId: 'DX-2026-002',
    firstName: 'Noah',
    lastName: 'Williams',
    email: 'noah.williams@example.com',
    phone: '+1 202 555 0142',
    course: 'Business Administration',
    department: 'Business',
    enrollmentDate: '2026-09-05',
    status: 'Active',
    address: 'Chicago, USA',
    notes: '',
    createdAt: '2026-09-05T10:15:00.000Z'
},

{
    _id: 'st-1003',
    studentId: 'DX-2026-003',
    firstName: 'Amelia',
    lastName: 'Chen',
    email: 'amelia.chen@example.com',
    phone: '+1 202 555 0143',
    course: 'Data Science',
    department: 'Technology',
    enrollmentDate: '2026-09-11',
    status: 'On Leave',
    address: 'Seattle, USA',
    notes: 'Temporary academic leave.',
    createdAt: '2026-09-11T08:20:00.000Z'
},

{
    _id: 'st-1004',
    studentId: 'DX-2026-004',
    firstName: 'Ethan',
    lastName: 'Patel',
    email: 'ethan.patel@example.com',
    phone: '+1 202 555 0144',
    course: 'Graphic Design',
    department: 'Creative Arts',
    enrollmentDate: '2026-09-14',
    status: 'Active',
    address: 'Austin, USA',
    notes: '',
    createdAt: '2026-09-14T12:00:00.000Z'
},

{
    _id: 'st-1005',
    studentId: 'DX-2026-005',
    firstName: 'Sophia',
    lastName: 'Reed',
    email: 'sophia.reed@example.com',
    phone: '+1 202 555 0145',
    course: 'Marketing',
    department: 'Business',
    enrollmentDate: '2026-09-19',
    status: 'Graduated',
    address: 'Boston, USA',
    notes: 'Completed the program.',
    createdAt: '2026-09-19T11:40:00.000Z'
},

{
    _id: 'st-1006',
    studentId: 'DX-2026-006',
    firstName: 'Liam',
    lastName: 'Garcia',
    email: 'liam.garcia@example.com',
    phone: '+1 202 555 0146',
    course: 'Software Engineering',
    department: 'Technology',
    enrollmentDate: '2026-09-23',
    status: 'Active',
    address: 'Denver, USA',
    notes: '',
    createdAt: '2026-09-23T09:10:00.000Z'
},

{
    _id: 'st-1007',
    studentId: 'DX-2026-007',
    firstName: 'Isabella',
    lastName: 'Khan',
    email: 'isabella.khan@example.com',
    phone: '+1 202 555 0147',
    course: 'Psychology',
    department: 'Social Sciences',
    enrollmentDate: '2026-10-01',
    status: 'Active',
    address: 'London, UK',
    notes: '',
    createdAt: '2026-10-01T14:25:00.000Z'
},

{
    _id: 'st-1008',
    studentId: 'DX-2026-008',
    firstName: 'Lucas',
    lastName: 'Martin',
    email: 'lucas.martin@example.com',
    phone: '+1 202 555 0148',
    course: 'Finance',
    department: 'Business',
    enrollmentDate: '2026-10-07',
    status: 'On Leave',
    address: 'Toronto, Canada',
    notes: '',
    createdAt: '2026-10-07T08:45:00.000Z'
},

{
    _id: 'st-1009',
    studentId: 'DX-2026-009',
    firstName: 'Mia',
    lastName: 'Thompson',
    email: 'mia.thompson@example.com',
    phone: '+1 202 555 0149',
    course: 'UI/UX Design',
    department: 'Creative Arts',
    enrollmentDate: '2026-10-12',
    status: 'Active',
    address: 'Miami, USA',
    notes: '',
    createdAt: '2026-10-12T10:05:00.000Z'
}
```

];

// ============================================================
// 4. LOCAL STORAGE HELPERS
// ============================================================

// Read data from localStorage

const read = (key, fallback) => {

```
try {

    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : fallback;

} catch {

    return fallback;

}
```

};

// Get Users

const users = () => read(USERS_KEY, initialUsers);

// Get Students

const students = () => read(STUDENTS_KEY, initialStudents);

// Save Data Safely

const safeSave = (key, value) => {

```
try {

    localStorage.setItem(key, JSON.stringify(value));

} catch (error) {

    throw new Error(
        'Browser storage is full or unavailable. Export a backup and clear some browser storage.'
    );

}
```

};

// Save Users

const saveUsers = value => safeSave(USERS_KEY, value);

// Save Students

const saveStudents = value => safeSave(STUDENTS_KEY, value);

// ============================================================
// 5. INITIALIZE DEMO DATA
// ============================================================

// Initialize demo records once.
// Existing user-created data is never overwritten.

try {

```
if (!localStorage.getItem(USERS_KEY)) {
    saveUsers(initialUsers);
}

if (!localStorage.getItem(STUDENTS_KEY)) {
    saveStudents(initialStudents);
}
```

} catch (error) {

```
console.warn(
    'Devixo storage initialization:',
    error
);
```

}

// ============================================================
// 6. BACKUP AND RESTORE FUNCTIONS
// ============================================================

// Download Backup

export function downloadBackup() {

```
const backup = {

    app: 'Devixo Student Management',

    version: 1,

    exportedAt: new Date().toISOString(),

    users: users(),

    students: students()

};


const blob = new Blob(
    [JSON.stringify(backup, null, 2)],
    {
        type: 'application/json'
    }
);


const url = URL.createObjectURL(blob);

const a = document.createElement('a');

a.href = url;

a.download = `devixo-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;


document.body.appendChild(a);

a.click();

a.remove();

URL.revokeObjectURL(url);
```

}

// Restore Backup

export async function restoreBackup(file) {

```
const backup = JSON.parse(
    await file.text()
);


// Validate Backup File

if (
    backup.app !== 'Devixo Student Management' ||
    !Array.isArray(backup.users) ||
    !Array.isArray(backup.students)
) {

    throw new Error(
        'This is not a valid Devixo backup file.'
    );

}


// Validate Backup Records

if (
    !backup.users.every(
        u => u.id && u.email && u.password
    ) ||

    !backup.students.every(
        s => s._id && s.studentId
    )
) {

    throw new Error(
        'Backup data is incomplete or invalid.'
    );

}


// Restore Data

saveUsers(backup.users);

saveStudents(backup.students);


// Clear Existing Session

localStorage.removeItem(TOKEN_KEY);

return true;
```

}

// ============================================================
// 7. AUTHENTICATION HELPERS
// ============================================================

// Get Current Logged-in User

const currentUser = () => {

```
const id = localStorage.getItem(TOKEN_KEY);

return users().find(
    u => u.id === id
) || null;
```

};

// Return Safe Public User Data

const publicUser = u => ({

```
id: u.id,

name: u.name,

email: u.email,

role: u.role
```

});

// Error Handler

const fail = message => {

```
throw new Error(message);
```

};

// Simulate API Delay

const delay = ms => new Promise(
resolve => setTimeout(resolve, ms)
);

// ============================================================
// 8. MAIN DEMO API FUNCTION
// ============================================================

export async function api(path, options = {}) {

```
// Simulate Network Request

await delay(180);


// Request Configuration

const method = (
    options.method || 'GET'
).toUpperCase();

const body = options.body
    ? JSON.parse(options.body)
    : {};


// Parse URL

const url = new URL(
    path,
    'http://demo.local'
);

const route = url.pathname;

const query = url.searchParams;


// ========================================================
// 9. USER LOGIN
// ========================================================

if (
    route === '/auth/login' &&
    method === 'POST'
) {

    const user = users().find(

        u =>
            u.email.toLowerCase() ===
            String(body.email || '').toLowerCase() &&

            u.password === body.password

    );


    if (!user) {

        fail('Email or password is incorrect.');

    }


    localStorage.setItem(
        TOKEN_KEY,
        user.id
    );


    return {

        token: user.id,

        user: publicUser(user)

    };

}


// ========================================================
// 10. USER REGISTRATION
// ========================================================

if (
    route === '/auth/register' &&
    method === 'POST'
) {

    // Validate Registration Data

    if (
        !body.name?.trim() ||

        !/^\S+@\S+\.\S+$/.test(body.email || '') ||

        (body.password || '').length < 8
    ) {

        fail(
            'Enter a name, valid email, and password of at least 8 characters.'
        );

    }


    const all = users();


    // Check Duplicate Email

    if (
        all.some(
            u => u.email.toLowerCase() === body.email.toLowerCase()
        )
    ) {

        fail(
            'An account with this email already exists.'
        );

    }


    // Create New User

    const user = {

        id: `demo-user-${Date.now()}`,

        name: body.name.trim(),

        email: body.email.toLowerCase(),

        password: body.password,

        role: 'staff'

    };


    saveUsers([...all, user]);

    localStorage.setItem(
        TOKEN_KEY,
        user.id
    );


    return {

        token: user.id,

        user: publicUser(user)

    };

}


// ========================================================
// 11. GET CURRENT USER
// ========================================================

if (route === '/auth/me') {

    const user = currentUser();

    if (!user) {

        fail(
            'Session expired. Please sign in again.'
        );

    }


    return {

        user: publicUser(user)

    };

}


// ========================================================
// 12. AUTHENTICATION CHECK
// ========================================================

const user = currentUser();


if (!user) {

    fail(
        'Please sign in to continue.'
    );

}


// ========================================================
// 13. DASHBOARD STATISTICS
// ========================================================

if (route === '/dashboard/stats') {

    const all = students();


    return {

        stats: {

            total: all.length,

            active: all.filter(
                s => s.status === 'Active'
            ).length,

            onLeave: all.filter(
                s => s.status === 'On Leave'
            ).length,

            graduated: all.filter(
                s => s.status === 'Graduated'
            ).length

        },


        recent: [...all]

            .sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )

            .slice(0, 5)

    };

}


// ========================================================
// 14. GET STUDENTS / SEARCH / PAGINATION
// ========================================================

if (
    route === '/students' &&
    method === 'GET'
) {

    let all = students();


    // Search Students

    const search = (
        query.get('search') || ''
    ).toLowerCase();


    if (search) {

        all = all.filter(

            s => [

                s.firstName,

                s.lastName,

                s.email,

                s.studentId,

                s.course,

                s.department

            ].some(

                v => (v || '')
                    .toLowerCase()
                    .includes(search)

            )

        );

    }


    // Sort Latest Records First

    all.sort(

        (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)

    );


    // Pagination

    const page = Math.max(
        1,
        Number(query.get('page')) || 1
    );

    const limit = Math.min(
        50,
        Number(query.get('limit')) || 10
    );

    const total = all.length;


    return {

        students: all.slice(
            (page - 1) * limit,
            page * limit
        ),

        pagination: {

            page,

            limit,

            total,

            pages: Math.ceil(total / limit)

        }

    };

}


// ========================================================
// 15. STUDENT PROFILE / UPDATE / DELETE
// ========================================================

if (route.startsWith('/students/')) {

    const id = route.split('/')[2];

    const all = students();


    // Find Student

    const index = all.findIndex(
        s => s._id === id
    );


    if (index < 0) {

        fail('Student not found.');

    }


    // GET Student Profile

    if (method === 'GET') {

        return {

            student: all[index]

        };

    }


    // PUT Update Student

    if (method === 'PUT') {

        const duplicate = all.some(

            (s, i) =>

                i !== index && (

                    s.studentId.toLowerCase() ===
                    String(body.studentId).toLowerCase() ||

                    s.email.toLowerCase() ===
                    String(body.email).toLowerCase()

                )

        );


        if (duplicate) {

            fail(
                'Student ID or email already exists.'
            );

        }


        const updated = {

            ...all[index],

            ...body,

            _id: id

        };


        all[index] = updated;

        saveStudents(all);


        return {

            student: updated

        };

    }


    // DELETE Student

    if (method === 'DELETE') {

        // Admin Permission Check

        if (user.role !== 'admin') {

            fail(
                'You do not have permission for this action.'
            );

        }


        all.splice(index, 1);

        saveStudents(all);


        return {

            message: 'Student record deleted successfully.'

        };

    }

}


// ========================================================
// 16. ADD NEW STUDENT
// ========================================================

if (
    route === '/students' &&
    method === 'POST'
) {

    const all = students();


    // Check Duplicate Student ID or Email

    if (

        all.some(

            s =>

                s.studentId.toLowerCase() ===
                String(body.studentId).toLowerCase() ||

                s.email.toLowerCase() ===
                String(body.email).toLowerCase()

        )

    ) {

        fail(
            'Student ID or email already exists.'
        );

    }


    // Create Student Record

    const student = {

        ...body,

        _id: `st-${Date.now()}`,

        createdAt: new Date().toISOString()

    };


    saveStudents([student, ...all]);


    return {

        student

    };

}


// ========================================================
// 17. UNKNOWN API ROUTE
// ========================================================

fail('Demo route not found.');
```

}
