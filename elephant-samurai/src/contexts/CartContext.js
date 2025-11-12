import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function TicketCartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const [reservationTimer, setReservationTimer] = useState(null)
    const RESERVATION_DURATION = 15 * 60 * 1000 // 15 minutes
    const addTicketToCart = ticket => {
        const cartItem = {
            id: `${ticket.id}-${ticket.seatNumber}`,
            showId: ticket.id,
            showTitle: ticket.title,
            showDate: ticket.date,
            seatNumber: ticket.seatNumber,
            seatName: ticket.seatName,
            price: ticket.price,
            addedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + RESERVATION_DURATION).toISOString(),
        }
        setCartItems(prevItems => {
            const exists = prevItems.find(item => item.id === cartItem.id)
            if (exists) return prevItems
            return [...prevItems, cartItem]
        })

        if (!reservationTimer) {
            startReservationTimer()
        }
    }

    const removeTicketFromCart = cartItemId => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId))
    }

    const clearExpiredTickerts = () => {
        setCartItems(prevItems => prevItems.filter(item => new Date(item.expiresAt) > Date.now()))
    }
    const startReservationTimer = () => {
        const timer = setInterval(() => {
            clearExpiredTickerts()
        }, 60 * 1000)
        setReservationTimer(timer)
    }

    const clearCart = () => {
        setCartItems([])
        if (reservationTimer) {
            clearInterval(reservationTimer)
            setReservationTimer(null)
        }
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => (total += item.price), 0)
    }

    const getTicketCount = () => {
        return cartItems.length
    }

    const getRemainingTime = () => {
        if (cartItems.length === 0) return null
        const earliestExpiry = Math.min(
            ...cartItems.map(item => new Date(item.expiresAt).getTime())
        )
        return Math.max(0, earliestExpiry - Date.now())
    }

    useEffect(() => {
        return () => {
            if (reservationTimer) {
                clearInterval(reservationTimer)
            }
        }
    }, [reservationTimer])

    const contextValue = {
        cartItems,
        addTicketToCart,
        removeTicketFromCart,
        clearCart,
        getTotalPrice,
        getTicketCount,
        getRemainingTime,
        clearExpiredTickerts,
    }

    return (
        <TicketCartProvider.Provider value={contextValue}>{children}</TicketCartProvider.Provider>
    )
}

export function useTicketCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useTicketCart must be used within a TicketCartProvider')
    }
    return context
}
