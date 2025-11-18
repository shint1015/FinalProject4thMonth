import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export default function VenueAdd() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        id: '',
        name: '',
        capacity: '',
        seat_id_format: '',
        notes: '',
        layout: '',
    })
    const [error, setError] = useState('')

    const onChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const onSubmit = e => {
        e.preventDefault()
        setError('')
        if (!form.id || !form.name) {
            setError('Please fill in required fields.')
            return
        }
        let layout = undefined
        if (form.layout) {
            try {
                layout = JSON.parse(form.layout)
            } catch {
                setError('Layout must be valid JSON')
                return
            }
        }
        const payload = {
            id: form.id,
            name: form.name,
            capacity: Number(form.capacity || 0),
            seat_id_format: form.seat_id_format || '',
            notes: form.notes || '',
            ...(layout ? { layout } : {}),
        }
        const key = 'adminVenues'
        const prev = JSON.parse(localStorage.getItem(key) || '[]')
        const next = Array.isArray(prev) ? [...prev, payload] : [payload]
        localStorage.setItem(key, JSON.stringify(next))

        const removed = JSON.parse(localStorage.getItem('adminVenuesRemoved') || '[]')
        const filtered = (Array.isArray(removed) ? removed : []).filter(
            r => String(r) !== String(form.id)
        )
        localStorage.setItem('adminVenuesRemoved', JSON.stringify(filtered))
        navigate({ to: '/admin/venue/list' })
    }

    return (
        <main className='px-4 sm:px-6 lg:px-8 py-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-primary-yellow font-title'>
                Add Venue
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
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Field label='Capacity'>
                        <input
                            type='number'
                            name='capacity'
                            value={form.capacity}
                            onChange={onChange}
                            className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                        />
                    </Field>
                    <Field label='Seat ID Format'>
                        <input
                            name='seat_id_format'
                            value={form.seat_id_format}
                            onChange={onChange}
                            className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                        />
                    </Field>
                </div>
                <Field label='Notes'>
                    <textarea
                        name='notes'
                        value={form.notes}
                        onChange={onChange}
                        rows={3}
                        className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                    />
                </Field>
                <Field label='Layout (JSON)'>
                    <textarea
                        name='layout'
                        value={form.layout}
                        onChange={onChange}
                        rows={6}
                        placeholder='{"rows":["A","B"],"cols":[1,2,3]}'
                        className='w-full font-mono text-xs bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                    />
                </Field>
                <div className='flex gap-3 pt-2'>
                    <button
                        type='submit'
                        className='inline-flex items-center gap-2 px-4 py-2 rounded bg-primary-yellow text-primary-black hover:bg-secondary-yellow'
                    >
                        Save
                    </button>
                    <button
                        type='button'
                        onClick={() => navigate({ to: '/admin/venue/list' })}
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
