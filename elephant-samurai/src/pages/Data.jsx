import { useState, useEffect } from 'react'

export default function PaymentDemo() {
    const [loading, setLoading] = useState(true)
    const [reservation, setReservation] = useState(null)
    const perPrice = 50
    const selectedSeats = ['A2', 'A1']
    const totalPrice = selectedSeats.length * perPrice

    useEffect(() => {
        fetch('/data/event.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not success')
                return response.json()
            })
            .then(data => {
                const target = data.find(item => item.id === 'evt-2025-10-29-disney')
                console.log(target)
                setReservation({
                    showTitle: target.title,
                    showDate: target.date,
                    showTime: target.time.start,
                    showImage: target.image_url,
                    showFee: 5.99,
                })
                setLoading(false);
            })
            .catch(error => {
                console.error('dataloading unsuccess')
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (reservation) {
            const saveReservation = {
                ...reservation,
                showSelectedSeat: selectedSeats,
                showTotalPrice: totalPrice,
                showTotalTicketAmount: selectedSeats.length,
                showTimeStamp: new Date().toISOString(),
            }
            localStorage.setItem('reservation', JSON.stringify(saveReservation))
        }
    }, [reservation])
}
