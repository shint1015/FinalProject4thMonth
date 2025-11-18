import { useEffect, useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'

export default function ShowEdit() {
    const navigate = useNavigate()
    const { id } = useParams({ from: '/admin/show/$id/edit' })
    const [form, setForm] = useState(null)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([])
    const [statuses, setStatuses] = useState([])

    // helpers
    const toDateTimeLocal = s => {
        if (!s) return ''
        return String(s).slice(0, 16) // 'YYYY-MM-DDTHH:MM'
    }

    // load base + overlay, pick by id
    useEffect(() => {
        async function load() {
            try {
                const res = await fetch('/data/event.json')
                const base = await res.json()
                const overlay = JSON.parse(localStorage.getItem('adminShows') || '[]')
                const merged = [...base, ...(Array.isArray(overlay) ? overlay : [])]
                const hit = merged.find(s => String(s.id) === String(id))
                if (!hit) {
                    setError('Show not found')
                    return
                }
                // load categories from category.json
                try {
                    const cres = await fetch('/data/category.json')
                    const clist = await cres.json()
                    const names = Array.from(
                        new Set(
                            (Array.isArray(clist) ? clist : []).map(c => c?.name).filter(Boolean)
                        )
                    )
                    if (names.length) setCategories(names)
                    else setCategories(['Musical', 'Concert', 'Comedy Show', 'Stage Play', 'Other'])
                } catch {
                    setCategories(['Musical', 'Concert', 'Comedy Show', 'Stage Play', 'Other'])
                }
                // load statuses from eventStatus.json
                try {
                    const sres = await fetch('/data/eventStatus.json')
                    const slist = await sres.json()
                    const arr = Array.isArray(slist)
                        ? slist
                              .map(s => ({ code: s?.code, label: s?.label || s?.code }))
                              .filter(s => s.code)
                        : []
                    setStatuses(
                        arr.length
                            ? arr
                            : [
                                  { code: 'available', label: 'Available' },
                                  { code: 'sold_out', label: 'Sold Out' },
                                  { code: 'coming_soon', label: 'Coming Soon' },
                                  { code: 'cancelled', label: 'Cancelled' },
                              ]
                    )
                } catch {
                    setStatuses([
                        { code: 'available', label: 'Available' },
                        { code: 'sold_out', label: 'Sold Out' },
                        { code: 'coming_soon', label: 'Coming Soon' },
                        { code: 'cancelled', label: 'Cancelled' },
                    ])
                }

                setForm({
                    title: hit.title || '',
                    category: hit.category || '',
                    date: hit.date || '',
                    start: toDateTimeLocal(hit?.time?.start),
                    end: toDateTimeLocal(hit?.time?.end),
                    venue_id: hit.venue_id || '',
                    currency: hit.currency || 'USD',
                    image_url: hit.image_url || '',
                    tags: Array.isArray(hit.tags) ? hit.tags.join(', ') : '',
                    status: hit.status || 'draft',
                })
            } catch {
                setError('Failed to load show data')
            }
        }
        load()
    }, [id])

    const onChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    // Sync date from start if empty
    useEffect(() => {
        if (!form) return
        if (!form.date && form.start) {
            const d = String(form.start).slice(0, 10)
            setForm(prev => ({ ...prev, date: d }))
        }
    }, [form])

    const onSubmit = e => {
        e.preventDefault()
        setError('')
        if (!form.title || !form.category || !form.venue_id || !form.start || !form.end) {
            setError('Please fill in required fields.')
            return
        }
        const key = 'adminShows'
        const prev = JSON.parse(localStorage.getItem(key) || '[]')
        let next
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
        if (Array.isArray(prev) && prev.some(s => String(s.id) === String(id))) {
            next = prev.map(s => (String(s.id) === String(id) ? payload : s))
        } else {
            // Editing an item that exists only in base dataset: upsert into overlay
            next = Array.isArray(prev) ? [...prev, payload] : [payload]
        }
        localStorage.setItem(key, JSON.stringify(next))

        // Ensure edited show is not hidden by removal list
        const removed = JSON.parse(localStorage.getItem('adminShowsRemoved') || '[]')
        const filteredRemoved = (Array.isArray(removed) ? removed : []).filter(
            rid => String(rid) !== String(id)
        )
        localStorage.setItem('adminShowsRemoved', JSON.stringify(filteredRemoved))
        navigate({ to: '/admin/show/list' })
    }

    if (error) {
        return (
            <main className='px-4 sm:px-6 lg:px-8 py-8'>
                <div className='rounded bg-rose-50 text-rose-700 px-3 py-2 text-sm'>{error}</div>
            </main>
        )
    }

    if (!form) {
        return (
            <main className='px-4 sm:px-6 lg:px-8 py-8'>
                <div className='h-6 w-40 bg-gray-200 rounded animate-pulse' />
                <div className='mt-6 space-y-3 max-w-2xl'>
                    <div className='h-10 bg-gray-200 rounded animate-pulse' />
                    <div className='h-10 bg-gray-200 rounded animate-pulse' />
                    <div className='h-10 bg-gray-200 rounded animate-pulse' />
                </div>
            </main>
        )
    }

    return (
        <main className='px-4 sm:px-6 lg:px-8 py-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-primary-yellow font-title'>
                Edit Show
            </h1>

            <form onSubmit={onSubmit} className='mt-6 max-w-2xl space-y-4'>
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
                        {/* Ensure current value appears even if not in list */}
                        {form.category && !categories.includes(form.category) && (
                            <option value={form.category}>{form.category}</option>
                        )}
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
                            onChange={e => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                const reader = new FileReader()
                                reader.onload = () => {
                                    const dataUrl = reader.result
                                    setForm(prev => ({ ...prev, image_url: dataUrl }))
                                }
                                reader.readAsDataURL(file)
                            }}
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
                        Save Changes
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
