import { useEffect, useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { mockUsers } from '@/mock/authApi.js'

export default function UserEdit() {
    const navigate = useNavigate()
    const { id } = useParams({ from: '/admin/user/$id/edit' })
    const [form, setForm] = useState({ id: '', name: '', email: '', role: '', status: 'active' })
    const [error, setError] = useState('')

    useEffect(() => {
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
        const map = new Map()
        for (const u of base) map.set(String(u.id), u)
        if (Array.isArray(overlay)) for (const u of overlay) map.set(String(u.id), u)
        const merged = Array.from(map.values()).filter(u => !removed.includes(String(u.id)))
        const item = merged.find(u => String(u.id) === String(id))
        if (!item) {
            setError('User not found')
            return
        }
        setForm({
            id: item.id || '',
            name: item.name || '',
            email: item.email || '',
            role: item.role || '',
            status: item.status || 'active',
        })
    }, [id])

    const onChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const onSubmit = e => {
        e.preventDefault()
        setError('')
        if (!form.name || !form.email) {
            setError('Please fill in required fields.')
            return
        }
        const payload = { ...form }
        const key = 'adminUsers'
        const prev = JSON.parse(localStorage.getItem(key) || '[]')
        const others = (Array.isArray(prev) ? prev : []).filter(
            u => String(u.id) !== String(form.id)
        )
        localStorage.setItem(key, JSON.stringify([...others, payload]))
        navigate({ to: '/admin/user/list' })
    }

    if (error) {
        return (
            <main className='px-4 sm:px-6 lg:px-8 py-8'>
                <div className='rounded bg-rose-50 text-rose-700 px-3 py-2 text-sm'>{error}</div>
            </main>
        )
    }

    return (
        <main className='px-4 sm:px-6 lg:px-8 py-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-primary-yellow font-title'>
                Edit User
            </h1>
            <form onSubmit={onSubmit} className='mt-6 max-w-2xl space-y-4'>
                <Field label='ID'>
                    <input
                        name='id'
                        value={form.id}
                        disabled
                        className='w-full bg-gray-100 text-gray-700 px-3 py-2 rounded border border-gray-200'
                    />
                </Field>
                <Field label='Name*'>
                    <input
                        name='name'
                        value={form.name}
                        onChange={onChange}
                        className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                    />
                </Field>
                <Field label='Email*'>
                    <input
                        type='email'
                        name='email'
                        value={form.email}
                        onChange={onChange}
                        className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                    />
                </Field>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Field label='Role'>
                        <input
                            name='role'
                            value={form.role}
                            onChange={onChange}
                            className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                        />
                    </Field>
                    <Field label='Status'>
                        <select
                            name='status'
                            value={form.status}
                            onChange={onChange}
                            className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                        >
                            <option value='active'>active</option>
                            <option value='inactive'>inactive</option>
                            <option value='blocked'>blocked</option>
                        </select>
                    </Field>
                </div>
                <div className='flex gap-3 pt-2'>
                    <button
                        type='submit'
                        className='inline-flex items-center gap-2 px-4 py-2 rounded bg-primary-yellow text-primary-black hover:bg-secondary-yellow'
                    >
                        Update
                    </button>
                    <button
                        type='button'
                        onClick={() => navigate({ to: '/admin/user/list' })}
                        className='inline-flex items-center gap-2 px-4 py-2 rounded border border-primary-yellow text-primary-yellow hover:bg-primary-yellow hover:text-primary-black'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    )
}

function Field({ label, children }) {
    return (
        <label className='block'>
            <span className='block text-sm text-gray-600 mb-1'>{label}</span>
            {children}
        </label>
    )
}
