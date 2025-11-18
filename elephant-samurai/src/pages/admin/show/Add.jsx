import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export default function ShowAdd() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        title: '',
        category: '',
        date: '', // e.g., 2025-10-31
        start: '', // e.g., 2025-10-31T19:30:00
        end: '',
        venue_id: '',
        currency: 'USD',
        image_url: '',
        tags: '', // comma separated
        status: 'draft',
    })
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([])
    const [statuses, setStatuses] = useState([])

    useEffect(() => {
        const loadCategories = async () => {
            const fallback = ['Musical', 'Concert', 'Comedy Show', 'Stage Play', 'Other']
            try {
                const res = await fetch('/data/category.json')
                const list = await res.json()
                const names = Array.from(
                    new Set((Array.isArray(list) ? list : []).map(c => c?.name).filter(Boolean))
                )
                setCategories(names.length ? names : fallback)
            } catch {
                setCategories(fallback)
            }
        }
        loadCategories()
    }, [])

    useEffect(() => {
        const loadStatuses = async () => {
            const fallback = [
                { code: 'available', label: 'Available' },
                { code: 'sold_out', label: 'Sold Out' },
                { code: 'coming_soon', label: 'Coming Soon' },
                { code: 'cancelled', label: 'Cancelled' },
            ]
            try {
                const res = await fetch('/data/eventStatus.json')
                const list = await res.json()
                const arr = Array.isArray(list)
                    ? list
                          .map(s => ({ code: s?.code, label: s?.label || s?.code }))
                          .filter(s => s.code)
                    : []
                setStatuses(arr.length ? arr : fallback)
            } catch {
                setStatuses(fallback)
            }
        }
        loadStatuses()
    }, [])

    // When start changes and date is empty, sync date from start for convenience
    useEffect(() => {
        if (!form.date && form.start) {
            const d = String(form.start).slice(0, 10)
            setForm(prev => ({ ...prev, date: d }))
        }
    }, [form.start, form.date])

    const onFileChange = async e => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            const dataUrl = reader.result
            setForm(prev => ({ ...prev, image_url: dataUrl }))
        }
        reader.readAsDataURL(file)
    }

    const onChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const slugify = s =>
        String(s)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

    const onSubmit = e => {
        e.preventDefault()
        setError('')

        if (!form.title || !form.category || !form.venue_id || !form.start || !form.end) {
            setError('Please fill in required fields.')
            return
        }

        const idDatePart = (form.date || form.start).slice(0, 10).replaceAll('-', '')
        const id = `evt-${idDatePart}-${slugify(form.title).slice(0, 12)}`

        const payload = {
            id,
            title: form.title,
            category: form.category,
            date: form.date || '',
            time: { start: form.start, end: form.end },
            showTime: '',
            venue_id: form.venue_id,
            currency: form.currency || 'USD',
            image_url: form.image_url || '',
            tags: form.tags
                .split(',')
                .map(t => t.trim())
                .filter(Boolean),
            status: form.status || 'draft',
        }

        // Save overlay
        const key = 'adminShows'
        const prev = JSON.parse(localStorage.getItem(key) || '[]')
        const next = Array.isArray(prev) ? [...prev, payload] : [payload]
        localStorage.setItem(key, JSON.stringify(next))

        // Ensure it's not hidden by a previous deletion
        const removed = JSON.parse(localStorage.getItem('adminShowsRemoved') || '[]')
        const filteredRemoved = (Array.isArray(removed) ? removed : []).filter(
            rid => String(rid) !== String(id)
        )
        localStorage.setItem('adminShowsRemoved', JSON.stringify(filteredRemoved))
        navigate({ to: '/admin/show/list' })
    }

    return (
        <main className='px-4 sm:px-6 lg:px-8 py-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-primary-yellow font-title'>
                Add Show
            </h1>

            <form onSubmit={onSubmit} className='mt-6 max-w-2xl space-y-4'>
                {error && (
                    <div className='rounded bg-rose-50 text-rose-700 px-3 py-2 text-sm'>
                        {error}
                    </div>
                )}
                <Field label='Title*'>
                    <input
                        name='title'
                        value={form.title}
                        onChange={onChange}
                        className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                    />
                </Field>
                <Field label='Category*'>
                    <select
                        name='category'
                        value={form.category}
                        onChange={onChange}
                        className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                    >
                        <option value=''>Select category</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </Field>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Field label='Date'>
                        <input
                            name='date'
                            type='date'
                            value={form.date}
                            onChange={onChange}
                            className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                        />
                    </Field>
                    <Field label='Venue ID*'>
                        <input
                            name='venue_id'
                            value={form.venue_id}
                            onChange={onChange}
                            placeholder='venue-medium-01'
                            className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                        />
                    </Field>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Field label='Start (Date & Time)*'>
                        <input
                            type='datetime-local'
                            name='start'
                            value={form.start}
                            onChange={onChange}
                            className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                        />
                    </Field>
                    <Field label='End (Date & Time)*'>
                        <input
                            type='datetime-local'
                            name='end'
                            value={form.end}
                            onChange={onChange}
                            className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                        />
                    </Field>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Field label='Image (Upload)'>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={onFileChange}
                            className='block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200'
                        />
                        {form.image_url && (
                            <div className='mt-2'>
                                <img
                                    src={form.image_url}
                                    alt='preview'
                                    className='h-24 w-40 object-cover rounded border border-gray-200'
                                />
                            </div>
                        )}
                    </Field>
                    <Field label='Currency'>
                        <input
                            name='currency'
                            value={form.currency}
                            onChange={onChange}
                            className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                        />
                    </Field>
                </div>
                <Field label='Tags (comma separated)'>
                    <input
                        name='tags'
                        value={form.tags}
                        onChange={onChange}
                        placeholder='concert, live'
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
                        {/* Show draft as placeholder if not in statuses */}
                        {form.status && !statuses.some(s => s.code === form.status) && (
                            <option value={form.status}>{form.status}</option>
                        )}
                        {statuses.map(s => (
                            <option key={s.code} value={s.code}>
                                {s.label}
                            </option>
                        ))}
                    </select>
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
                        onClick={() => navigate({ to: '/admin/show/list' })}
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
