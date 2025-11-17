import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Th, Td } from '@/components/admin/Table.jsx'
import DeleteIcon from '@/components/icons/DeleteIcon.jsx'
import EditIcon from '@/components/icons/EditIcon.jsx'

export default function ShowList() {
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')

    const loadShows = useCallback(async () => {
        try {
            const response = await fetch('/data/event.json')
            const data = await response.json()
            const base = Array.isArray(data) ? data : []
            const overlay = JSON.parse(localStorage.getItem('adminShows') || '[]')
            const removed = JSON.parse(localStorage.getItem('adminShowsRemoved') || '[]')

            // Prefer overlay items when id collides; then filter removed ids
            const map = new Map()
            for (const s of base) map.set(String(s.id), s)
            if (Array.isArray(overlay)) {
                for (const s of overlay) map.set(String(s.id), s)
            }
            const merged = Array.from(map.values()).filter(s => !removed.includes(String(s.id)))
            setShows(merged)
        } catch (error) {
            console.error('Error fetching shows:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadShows()
    }, [loadShows])

    const handleDelete = useCallback(
        id => {
            const idStr = String(id)
            const overlay = JSON.parse(localStorage.getItem('adminShows') || '[]')
            const removed = JSON.parse(localStorage.getItem('adminShowsRemoved') || '[]')

            if (!window.confirm('Delete this show? This will hide it from the list.')) return

            // Remove from overlay if exists
            const nextOverlay = Array.isArray(overlay)
                ? overlay.filter(s => String(s.id) !== idStr)
                : []
            localStorage.setItem('adminShows', JSON.stringify(nextOverlay))

            // Add to removed ids (avoid duplicates)
            const setRemoved = new Set(Array.isArray(removed) ? removed.map(String) : [])
            setRemoved.add(idStr)
            localStorage.setItem('adminShowsRemoved', JSON.stringify(Array.from(setRemoved)))

            // Refresh list
            loadShows()
        },
        [loadShows]
    )

    const filtered = useMemo(() => {
        if (!query) return shows
        const q = query.toLowerCase()
        return shows.filter(
            s =>
                [s.title, s.category, s.venue_id]
                    .filter(Boolean)
                    .some(v => String(v).toLowerCase().includes(q)) ||
                (Array.isArray(s.tags) && s.tags.some(t => t.toLowerCase().includes(q)))
        )
    }, [shows, query])

    const statusBadge = status => {
        const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium'
        switch (String(status).toLowerCase()) {
            case 'published':
            case 'active':
                return `${base} bg-emerald-100 text-emerald-800`
            case 'draft':
                return `${base} bg-amber-100 text-amber-800`
            case 'cancelled':
            case 'canceled':
                return `${base} bg-rose-100 text-rose-800`
            default:
                return `${base} bg-gray-100 text-gray-800`
        }
    }

    if (loading) {
        return (
            <main className='px-4 sm:px-6 lg:px-8 py-8'>
                <h1 className='text-2xl sm:text-3xl font-bold text-primary-yellow font-title'>
                    Admin Show List
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
            {/* Header */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <h1 className='text-2xl sm:text-3xl font-bold text-primary-yellow font-title'>
                    Admin Show List
                </h1>
                <div className='flex items-center gap-2'>
                    <input
                        type='text'
                        placeholder='Search title, tag, venue...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className='bg-primary-white text-primary-black placeholder:text-gray-500 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow/70 min-w-[260px]'
                    />
                    <button
                        type='button'
                        className='hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded border border-primary-yellow text-primary-black bg-primary-yellow hover:bg-secondary-yellow transition-colors'
                        onClick={() => setQuery('')}
                    >
                        Clear
                    </button>
                    <Link
                        to='/admin/show/add'
                        className='inline-flex items-center gap-2 px-3 py-2 rounded border border-primary-yellow text-primary-black bg-primary-yellow hover:bg-secondary-yellow transition-colors'
                    >
                        + Add Show
                    </Link>
                </div>
            </div>

            {/* Table wrapper */}
            <div className='mt-6 overflow-x-auto rounded-lg border border-gray-200/30 bg-white/60 backdrop-blur-sm'>
                <table className='min-w-full text-left align-middle'>
                    <thead className='bg-primary-yellow text-primary-black text-xs uppercase tracking-wide'>
                        <tr>
                            <Th>ID</Th>
                            <Th>Title</Th>
                            <Th>Category</Th>
                            <Th>Date</Th>
                            <Th>Time</Th>
                            {/* <Th>Venue</Th> */}
                            <Th>Price</Th>
                            <Th>Status</Th>
                            <Th>Image</Th>
                            <Th>Tags</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody className='bg-primary-white text-primary-black divide-y divide-gray-200 text-sm'>
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={10} className='px-4 py-8 text-center text-gray-500'>
                                    No shows found.
                                </td>
                            </tr>
                        )}
                        {filtered.map(show => (
                            <tr key={show.id} className='hover:bg-gray-50/60'>
                                <Td>{show.id}</Td>
                                <Td>
                                    <div className='flex items-center gap-3'>
                                        {show.image_url ? (
                                            <img
                                                src={show.image_url}
                                                alt={show.title}
                                                className='h-10 w-16 object-cover rounded border border-gray-200/60'
                                            />
                                        ) : (
                                            <div className='h-10 w-16 rounded bg-gray-100 border border-gray-200/60' />
                                        )}
                                        <div>
                                            <div className='font-medium text-primary-black'>
                                                {show.title}
                                            </div>
                                            <div className='text-xs text-primary-black'>
                                                {show.description?.short || ''}
                                            </div>
                                        </div>
                                    </div>
                                </Td>
                                <Td>
                                    <span className='text-primary-black'>{show.category}</span>
                                </Td>
                                <Td>
                                    <span className='whitespace-nowrap text-primary-black'>
                                        {show.date}
                                    </span>
                                </Td>
                                <Td>
                                    <span className='whitespace-nowrap text-primary-black'>
                                        {show.time?.start} – {show.time?.end}
                                    </span>
                                </Td>
                                {/* <Td>
                                    <span className='text-gray-700'>{show.venue_id}</span>
                                </Td> */}
                                <Td>
                                    <span className='font-semibold text-primary-black'>
                                        {Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: show.currency || 'USD',
                                        }).format(Number(show.price || 0))}
                                    </span>
                                </Td>
                                <Td>
                                    <span className={statusBadge(show.status)}>{show.status}</span>
                                </Td>
                                <Td>
                                    {show.image_url ? (
                                        <a
                                            href={show.image_url}
                                            target='_blank'
                                            rel='noreferrer'
                                            className='text-blue-600 hover:underline'
                                        >
                                            Open
                                        </a>
                                    ) : (
                                        <span className='text-gray-400'>—</span>
                                    )}
                                </Td>
                                <Td>
                                    <div className='flex flex-wrap gap-1 max-w-[260px]'>
                                        {(show.tags || []).map(tag => (
                                            <span
                                                key={tag}
                                                className='px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700'
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Td>
                                <Td>
                                    <div className='flex items-center gap-2'>
                                        <Link
                                            to={`/admin/show/${show.id}/edit`}
                                            className='inline-flex items-center justify-center h-8 w-8 text-gray-700 hover:text-gray-400'
                                            title='Edit'
                                            aria-label='Edit show'
                                        >
                                            <EditIcon color='#060606' />
                                        </Link>
                                        <button
                                            type='button'
                                            onClick={() => handleDelete(show.id)}
                                            className='inline-flex items-center justify-center h-8 w-8 text-gray-700 hover:text-gray-400'
                                            title='Delete'
                                            aria-label='Delete show'
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
