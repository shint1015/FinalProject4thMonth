import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export default function ReservationAdd() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        event_id: '',
        venue_id: '',
        seat_id: '',
        price: '',
        currency: 'USD',
        status: 'available',
        user_id: '',
        order_id: '',
        hold_expires_at: '',
    })
    const [statuses, setStatuses] = useState([])
    const [events, setEvents] = useState([])
    const [venues, setVenues] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const load = async () => {
            try {
                const s = await (await fetch('/data/reservationStatus.json')).json()
                setStatuses((Array.isArray(s) ? s : []).map(x => x.code))
            } catch {
                setStatuses(['available', 'held', 'reserved', 'sold', 'blocked'])
            }
            try {
                const e = await (await fetch('/data/event.json')).json()
                setEvents((Array.isArray(e) ? e : []).map(x => x.id))
            } catch {
                setEvents([])
            }
            try {
                const v = await (await fetch('/data/venue.json')).json()
                setVenues((Array.isArray(v) ? v : []).map(x => x.id))
            } catch {
                setVenues([])
            }
        }
        load()
    }, [])

    const onChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const onSubmit = e => {
        e.preventDefault()
        setError('')
        if (!form.event_id || !form.seat_id || !form.status) {
            setError('Please fill in required fields.')
            return
        }
        const id = `${form.event_id}:${form.seat_id}`
        const payload = { id, ...form, price: Number(form.price || 0) }
        const key = 'adminReservations'
        const prev = JSON.parse(localStorage.getItem(key) || '[]')
        const next = Array.isArray(prev) ? [...prev, payload] : [payload]
        localStorage.setItem(key, JSON.stringify(next))

        const removed = JSON.parse(localStorage.getItem('adminReservationsRemoved') || '[]')
        const filtered = (Array.isArray(removed) ? removed : []).filter(
            r => String(r) !== String(id)
        )
        localStorage.setItem('adminReservationsRemoved', JSON.stringify(filtered))
        navigate({ to: '/admin/reservation/list' })
    }

    return (
        <main className='px-4 sm:px-6 lg:px-8 py-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-primary-yellow font-title'>
                Add Reservation
            </h1>
            <form onSubmit={onSubmit} className='mt-6 max-w-2xl space-y-4'>
                {error && (
                    <div className='rounded bg-rose-50 text-rose-700 px-3 py-2 text-sm'>
                        {error}
                    </div>
                )}
                <Field label='Event*'>
                    <select
                        name='event_id'
                        value={form.event_id}
                        onChange={onChange}
                        className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                    >
                        <option value=''>Select event</option>
                        {events.map(eid => (
                            <option key={eid} value={eid}>
                                {eid}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label='Venue'>
                    <select
                        name='venue_id'
                        value={form.venue_id}
                        onChange={onChange}
                        className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                    >
                        <option value=''>Select venue</option>
                        {venues.map(vid => (
                            <option key={vid} value={vid}>
                                {vid}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label='Seat*'>
                    <input
                        name='seat_id'
                        value={form.seat_id}
                        onChange={onChange}
                        className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                    />
                </Field>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Field label='Price'>
                        <input
                            name='price'
                            type='number'
                            value={form.price}
                            onChange={onChange}
                            className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                        />
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
                <Field label='Status*'>
                    <select
                        name='status'
                        value={form.status}
                        onChange={onChange}
                        className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                    >
                        {statuses.map(s => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </Field>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Field label='User ID'>
                        <input
                            name='user_id'
                            value={form.user_id}
                            onChange={onChange}
                            className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                        />
                    </Field>
                    <Field label='Order ID'>
                        <input
                            name='order_id'
                            value={form.order_id}
                            onChange={onChange}
                            className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
                        />
                    </Field>
                </div>
                <Field label='Hold Expires At'>
                    <input
                        name='hold_expires_at'
                        type='datetime-local'
                        value={form.hold_expires_at}
                        onChange={onChange}
                        className='w-full bg-primary-white text-primary-black px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow/70'
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
                        onClick={() => navigate({ to: '/admin/reservation/list' })}
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
