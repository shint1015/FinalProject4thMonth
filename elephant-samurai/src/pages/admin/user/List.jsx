import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Th, Td } from '@/components/admin/Table.jsx'
import { mockUsers } from '@/mock/authApi.js'

export default function UserList() {
    const [items, setItems] = useState([])
    const [query, setQuery] = useState('')

    const load = useCallback(() => {
        const base = Array.isArray(mockUsers)
            ? mockUsers.map(u => ({
                  id: u.id,
                  name: u.displayName || u.name || '',
                  email: u.email || '',
                  role: u.role || '',
                  status: 'active',
              }))
            : []
        const overlay = JSON.parse(localStorage.getItem('adminUsers') || '[]')
        const removed = JSON.parse(localStorage.getItem('adminUsersRemoved') || '[]')
        // overlay wins on id collisions
        const map = new Map()
        for (const u of base) map.set(String(u.id), u)
        if (Array.isArray(overlay)) for (const u of overlay) map.set(String(u.id), u)
        const merged = Array.from(map.values()).filter(u => !removed.includes(String(u.id)))
        setItems(merged)
    }, [])

    useEffect(() => {
        load()
    }, [load])

    const handleDelete = useCallback(
        id => {
            const idStr = String(id)
            if (!window.confirm('Delete this user?')) return
            const overlay = JSON.parse(localStorage.getItem('adminUsers') || '[]')
            const removed = JSON.parse(localStorage.getItem('adminUsersRemoved') || '[]')
            const nextOverlay = Array.isArray(overlay)
                ? overlay.filter(u => String(u.id) !== idStr)
                : []
            localStorage.setItem('adminUsers', JSON.stringify(nextOverlay))
            const setRemoved = new Set(Array.isArray(removed) ? removed.map(String) : [])
            setRemoved.add(idStr)
            localStorage.setItem('adminUsersRemoved', JSON.stringify(Array.from(setRemoved)))
            load()
        },
        [load]
    )

    const filtered = useMemo(() => {
        if (!query) return items
        const q = query.toLowerCase()
        return items.filter(u =>
            [u.id, u.name, u.email, u.role, u.status]
                .filter(Boolean)
                .some(x => String(x).toLowerCase().includes(q))
        )
    }, [items, query])

    return (
        <main className='px-4 sm:px-6 lg:px-8 py-8'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <h1 className='text-2xl sm:text-3xl font-bold text-primary-yellow font-title'>
                    Admin User List
                </h1>
                <div className='flex items-center gap-2'>
                    <input
                        type='text'
                        placeholder='Search user...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className='bg-primary-white text-primary-black placeholder:text-gray-500 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow/70 min-w-[260px]'
                    />
                    <Link
                        to='/admin/user/add'
                        className='inline-flex items-center gap-2 px-3 py-2 rounded border border-primary-yellow text-primary-black bg-primary-yellow hover:bg-secondary-yellow transition-colors'
                    >
                        + Add User
                    </Link>
                </div>
            </div>

            <div className='mt-6 overflow-x-auto rounded-lg border border-gray-200/30 bg-white/60 backdrop-blur-sm'>
                <table className='min-w-full text-left align-middle'>
                    <thead className='bg-primary-yellow text-primary-black text-xs uppercase tracking-wide'>
                        <tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody className='bg-primary-white text-primary-black divide-y divide-gray-200 text-sm'>
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className='px-4 py-8 text-center text-gray-500'>
                                    No users found. Use Add User to create records (stored in
                                    LocalStorage).
                                </td>
                            </tr>
                        )}
                        {filtered.map(u => (
                            <tr key={u.id} className='hover:bg-gray-50/60'>
                                <Td>{u.id}</Td>
                                <Td>{u.name}</Td>
                                <Td>{u.email}</Td>
                                <Td>{u.role || <span className='text-gray-400'>—</span>}</Td>
                                <Td>{u.status || <span className='text-gray-400'>—</span>}</Td>
                                <Td>
                                    <div className='flex items-center gap-2'>
                                        <Link
                                            to={`/admin/user/${encodeURIComponent(u.id)}/edit`}
                                            className='inline-flex items-center justify-center h-8 w-8 text-gray-700 hover:text-gray-400'
                                            title='Edit'
                                            aria-label='Edit user'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                className='h-4 w-4'
                                            >
                                                <path d='M16.862 3.487a2.125 2.125 0 1 1 3.004 3.004L7.5 18.856 3 19.999l1.143-4.5 12.719-12.012z' />
                                            </svg>
                                        </Link>
                                        <button
                                            type='button'
                                            onClick={() => handleDelete(u.id)}
                                            className='inline-flex items-center justify-center h-8 w-8 text-gray-700 hover:text-gray-400'
                                            title='Delete'
                                            aria-label='Delete user'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                className='h-4 w-4'
                                            >
                                                <path d='M3 6h18M9 6V4h6v2m-8 0h10l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m4 4v8m6-8v8' />
                                            </svg>
                                        </button>
                                    </div>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

// Th, Td moved to shared components at src/components/admin/Table.jsx
