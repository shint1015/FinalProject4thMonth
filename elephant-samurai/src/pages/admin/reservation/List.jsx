import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Th, Td } from '@/components/admin/Table.jsx'
import DeleteIcon from '@/components/icons/DeleteIcon.jsx'
import EditIcon from '@/components/icons/EditIcon.jsx'

function makeId(r) {
    return `${r.event_id}:${r.seat_id}`
}

export default function ReservationList() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')

    const load = useCallback(async () => {
        try {
            const res = await fetch('/data/reservation.json')
            const base = await res.json()
            const withIds = (Array.isArray(base) ? base : []).map(r => ({ ...r, id: makeId(r) }))
            const overlay = JSON.parse(localStorage.getItem('adminReservations') || '[]')
            const removed = JSON.parse(localStorage.getItem('adminReservationsRemoved') || '[]')

            const map = new Map()
            for (const r of withIds) map.set(String(r.id), r)
            if (Array.isArray(overlay)) for (const r of overlay) map.set(String(r.id), r)
            const merged = Array.from(map.values()).filter(r => !removed.includes(String(r.id)))
            setItems(merged)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        load()
    }, [load])

    const handleDelete = useCallback(
        async id => {
            const idStr = String(id)
            if (!window.confirm('Delete this reservation?')) return
            const overlay = JSON.parse(localStorage.getItem('adminReservations') || '[]')
            const removed = JSON.parse(localStorage.getItem('adminReservationsRemoved') || '[]')

            const nextOverlay = Array.isArray(overlay)
                ? overlay.filter(r => String(r.id) !== idStr)
                : []
            localStorage.setItem('adminReservations', JSON.stringify(nextOverlay))

            const setRemoved = new Set(Array.isArray(removed) ? removed.map(String) : [])
            setRemoved.add(idStr)
            localStorage.setItem('adminReservationsRemoved', JSON.stringify(Array.from(setRemoved)))
            load()
        },
        [load]
    )

    const filtered = useMemo(() => {
        if (!query) return items
        const q = query.toLowerCase()
        return items.filter(r =>
            [r.event_id, r.venue_id, r.seat_id, r.user_id, r.order_id, r.status]
                .filter(Boolean)
                .some(v => String(v).toLowerCase().includes(q))
        )
    }, [items, query])

    if (loading) {
        return (
            <main className='px-4 sm:px-6 lg:px-8 py-8'>
                <h1 className='text-2xl sm:text-3xl font-bold text-primary-yellow font-title'>
                    Admin Reservation List
                </h1>
                <div className='mt-6 space-y-3'>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className='h-16 w-full rounded bg-gray-200/50 animate-pulse' />
                    ))}
                </div>
            </main>
        )
    }

    return (
        <main className='px-4 sm:px-6 lg:px-8 py-8'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <h1 className='text-2xl sm:text-3xl font-bold text-primary-yellow font-title'>
                    Admin Reservation List
                </h1>
                <div className='flex items-center gap-2'>
                    <input
                        type='text'
                        placeholder='Search event, seat, user...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className='bg-primary-white text-primary-black placeholder:text-gray-500 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow/70 min-w-[260px]'
                    />
                    <Link
                        to='/admin/reservation/add'
                        className='inline-flex items-center gap-2 px-3 py-2 rounded border border-primary-yellow text-primary-black bg-primary-yellow hover:bg-secondary-yellow transition-colors'
                    >
                        + Add Reservation
                    </Link>
                </div>
            </div>

            <div className='mt-6 overflow-x-auto rounded-lg border border-gray-200/30 bg-white/60 backdrop-blur-sm'>
                <table className='min-w-full text-left align-middle'>
                    <thead className='bg-primary-yellow text-primary-black text-xs uppercase tracking-wide'>
                        <tr>
                            <Th>ID</Th>
                            <Th>Event</Th>
                            <Th>Venue</Th>
                            <Th>Seat</Th>
                            <Th>Price</Th>
                            <Th>Status</Th>
                            <Th>User</Th>
                            <Th>Order</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody className='bg-primary-white text-primary-black divide-y divide-gray-200 text-sm'>
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={9} className='px-4 py-8 text-center text-gray-500'>
                                    No reservations found.
                                </td>
                            </tr>
                        )}
                        {filtered.map(r => (
                            <tr key={r.id} className='hover:bg-gray-50/60'>
                                <Td>{r.id}</Td>
                                <Td>{r.event_id}</Td>
                                <Td>{r.venue_id}</Td>
                                <Td>{r.seat_id}</Td>
                                <Td>
                                    {Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: r.currency || 'USD',
                                    }).format(Number(r.price || 0))}
                                </Td>
                                <Td>{r.status}</Td>
                                <Td>{r.user_id || <span className='text-gray-400'>—</span>}</Td>
                                <Td>{r.order_id || <span className='text-gray-400'>—</span>}</Td>
                                <Td>
                                    <div className='flex items-center gap-2'>
                                        <Link
                                            to={`/admin/reservation/${encodeURIComponent(r.id)}/edit`}
                                            className='inline-flex items-center justify-center h-8 w-8 text-gray-700 hover:text-gray-400'
                                            title='Edit'
                                            aria-label='Edit reservation'
                                        >
                                            <EditIcon color='#060606' />
                                        </Link>
                                        <button
                                            type='button'
                                            onClick={() => handleDelete(r.id)}
                                            className='inline-flex items-center justify-center h-8 w-8 text-gray-700 hover:text-gray-400'
                                            title='Delete'
                                            aria-label='Delete reservation'
                                        >
                                            <DeleteIcon color='#060606' />
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
