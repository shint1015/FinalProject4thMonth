import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export default function UserAdd() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ id: '', name: '', email: '', role: '', status: 'active' })
    const [error, setError] = useState('')

    const onChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const onSubmit = e => {
        e.preventDefault()
        setError('')
        if (!form.id || !form.name || !form.email) {
            setError('Please fill in required fields.')
            return
        }
        const payload = { ...form }
        const key = 'adminUsers'
        const prev = JSON.parse(localStorage.getItem(key) || '[]')
        const next = Array.isArray(prev) ? [...prev, payload] : [payload]
        localStorage.setItem(key, JSON.stringify(next))

        const removed = JSON.parse(localStorage.getItem('adminUsersRemoved') || '[]')
        const filtered = (Array.isArray(removed) ? removed : []).filter(
            r => String(r) !== String(form.id)
        )
        localStorage.setItem('adminUsersRemoved', JSON.stringify(filtered))
        navigate({ to: '/admin/user/list' })
    }

    return (
        <main className='px-4 sm:px-6 lg:px-8 py-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-primary-yellow font-title'>
                Add User
            </h1>
            <form onSubmit={onSubmit} className='mt-6 max-w-2xl space-y-4'>
                {error && (
                    <div className='rounded bg-rose-50 text-rose-700 px-3 py-2 text-sm'>
                        {error}
                    </div>
                )}
                <Field label='ID*'>
                    <input
                        name='id'
                        value={form.id}
                        onChange={onChange}
                        className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
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
                        Save
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
