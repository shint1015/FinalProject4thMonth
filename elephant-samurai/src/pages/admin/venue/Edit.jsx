import { useEffect, useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'

export default function VenueEdit() {
    const navigate = useNavigate()
    const { id } = useParams({ from: '/admin/venue/$id/edit' })
    const [form, setForm] = useState({
        id: '',
        name: '',
        capacity: '',
        seat_id_format: '',
        notes: '',
        layout: '',
    })
    const [error, setError] = useState('')

    useEffect(() => {
        const load = async () => {
            try {
                const base = await (await fetch('/data/venue.json')).json()
                const overlay = JSON.parse(localStorage.getItem('adminVenues') || '[]')
                const removed = JSON.parse(localStorage.getItem('adminVenuesRemoved') || '[]')
                const removedIds = new Set((Array.isArray(removed) ? removed : []).map(String))
                const map = new Map()
                for (const v of Array.isArray(base) ? base : []) map.set(String(v.id), v)
                if (Array.isArray(overlay)) for (const v of overlay) map.set(String(v.id), v)
                const item = Array.from(map.values())
                    .filter(v => !removedIds.has(String(v.id)))
                    .find(v => String(v.id) === String(id))
                if (!item) {
                    setError('Venue not found')
                    return
                }
                setForm({
                    id: item.id || '',
                    name: item.name || '',
                    capacity: item.capacity ?? '',
                    seat_id_format: item.seat_id_format || '',
                    notes: item.notes || '',
                    layout: item.layout ? JSON.stringify(item.layout, null, 2) : '',
                })
            } catch {
                setError('Failed to load venue')
            }
        }
        load()
    }, [id])

    const onChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const onSubmit = e => {
        e.preventDefault()
        setError('')
        if (!form.name) {
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
        const others = (Array.isArray(prev) ? prev : []).filter(
            v => String(v.id) !== String(form.id)
        )
        localStorage.setItem(key, JSON.stringify([...others, payload]))
        navigate({ to: '/admin/venue/list' })
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
                Edit Venue
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
                        className='w-full font-mono text-xs bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                    />
                </Field>
                <div className='flex gap-3 pt-2'>
                    <button
                        type='submit'
                        className='inline-flex items-center gap-2 px-4 py-2 rounded bg-primary-yellow text-primary-black hover:bg-secondary-yellow'
                    >
                        Update
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
