import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Th, Td } from '@/components/admin/Table.jsx'
import DeleteIcon from '@/components/icons/DeleteIcon.jsx'
import EditIcon from '@/components/icons/EditIcon.jsx'

export default function VenueList() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')

    const load = useCallback(async () => {
        try {
            const res = await fetch('/data/venue.json')
            const base = await res.json()
            const overlay = JSON.parse(localStorage.getItem('adminVenues') || '[]')
            const removed = JSON.parse(localStorage.getItem('adminVenuesRemoved') || '[]')

            const map = new Map()
            for (const v of Array.isArray(base) ? base : []) map.set(String(v.id), v)
            if (Array.isArray(overlay)) for (const v of overlay) map.set(String(v.id), v)
            const merged = Array.from(map.values()).filter(v => !removed.includes(String(v.id)))
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
            if (!window.confirm('Delete this venue?')) return
            const overlay = JSON.parse(localStorage.getItem('adminVenues') || '[]')
            const removed = JSON.parse(localStorage.getItem('adminVenuesRemoved') || '[]')

            const nextOverlay = Array.isArray(overlay)
                ? overlay.filter(v => String(v.id) !== idStr)
                : []
            localStorage.setItem('adminVenues', JSON.stringify(nextOverlay))

            const setRemoved = new Set(Array.isArray(removed) ? removed.map(String) : [])
            setRemoved.add(idStr)
            localStorage.setItem('adminVenuesRemoved', JSON.stringify(Array.from(setRemoved)))
            load()
        },
        [load]
    )

    const filtered = useMemo(() => {
        if (!query) return items
        const q = query.toLowerCase()
        return items.filter(v =>
            [v.id, v.name, v.seat_id_format]
                .filter(Boolean)
                .some(x => String(x).toLowerCase().includes(q))
        )
    }, [items, query])

    if (loading) {
        return (
            <main className='px-4 sm:px-6 lg:px-8 py-8'>
                <h1 className='text-2xl sm:text-3xl font-bold text-primary-yellow font-title'>
                    Admin Venue List
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
                    Admin Venue List
                </h1>
                <div className='flex items-center gap-2'>
                    <input
                        type='text'
                        placeholder='Search venue...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className='bg-primary-white text-primary-black placeholder:text-gray-500 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow/70 min-w-[260px]'
                    />
                    <Link
                        to='/admin/venue/add'
                        className='inline-flex items-center gap-2 px-3 py-2 rounded border border-primary-yellow text-primary-black bg-primary-yellow hover:bg-secondary-yellow transition-colors'
                    >
                        + Add Venue
                    </Link>
                </div>
            </div>

            <div className='mt-6 overflow-x-auto rounded-lg border border-gray-200/30 bg-white/60 backdrop-blur-sm'>
                <table className='min-w-full text-left align-middle'>
                    <thead className='bg-primary-yellow text-primary-black text-xs uppercase tracking-wide'>
                        <tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Capacity</Th>
                            <Th>Seat ID Format</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody className='bg-primary-white text-primary-black divide-y divide-gray-200 text-sm'>
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={5} className='px-4 py-8 text-center text-gray-500'>
                                    No venues found.
                                </td>
                            </tr>
                        )}
                        {filtered.map(v => (
                            <tr key={v.id} className='hover:bg-gray-50/60'>
                                <Td>{v.id}</Td>
                                <Td>{v.name}</Td>
                                <Td>{v.capacity}</Td>
                                <Td>
                                    {v.seat_id_format || <span className='text-gray-400'>—</span>}
                                </Td>
                                <Td>
                                    <div className='flex items-center gap-2'>
                                        <Link
                                            to={`/admin/venue/${encodeURIComponent(v.id)}/edit`}
                                            className='inline-flex items-center justify-center h-8 w-8 text-gray-700 hover:text-gray-400'
                                            title='Edit'
                                            aria-label='Edit venue'
                                        >
                                            <EditIcon color='#060606' />
                                        </Link>
                                        <button
                                            type='button'
                                            onClick={() => handleDelete(v.id)}
                                            className='inline-flex items-center justify-center h-8 w-8 text-gray-700 hover:text-gray-400'
                                            title='Delete'
                                            aria-label='Delete venue'
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

// Th, Td moved to shared components at src/components/admin/Table.jsx
