// Mock Database
export const mockUsers = [
    {
        id: 1,
        email: 'admin@elephant-samurai.com',
        password: 'admin123',
        displayName: 'Admin User',
        role: 'admin',
        avatar: null,
        gameStats: { level: 10, experience: 5000, gamesPlayed: 100 },
    },
    {
        id: 2,
        email: 'player@test.com',
        password: 'password',
        displayName: 'Test Player',
        name: 'John',
        lastName: 'Lennon',
        role: 'player',
        avatar: null,
        gameStats: { level: 3, experience: 750, gamesPlayed: 15 },
    },
]

const mockAPI = {
    login: async (email, password) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800))

        const user = mockUsers.find(u => u.email === email && u.password === password)

        if (user) {
            const token = `mock-token-${user.id}-${Date.now()}`
            const { password: _, ...userWithoutPassword } = user

            return {
                success: true,
                user: {
                    ...userWithoutPassword,
                    joinedAt: '2024-01-01T00:00:00Z',
                    lastLoginAt: new Date().toISOString(),
                },
                token,
            }
        } else {
            throw new Error('Invalid email or password')
        }
    },
    validateToken: async token => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300))

        // Simple token validation (in real app, decode JWT)
        if (token && token.startsWith('mock-token-')) {
            const userId = parseInt(token.split('-')[2])
            const user = mockUsers.find(u => u.id === userId)

            if (user) {
                const { password: _, ...userWithoutPassword } = user
                return {
                    valid: true,
                    user: {
                        ...userWithoutPassword,
                        joinedAt: '2024-01-01T00:00:00Z',
                        lastLoginAt: new Date().toISOString(),
                    },
                }
            }
        }

        return { valid: false }
    },

    logout: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 200))
        return { success: true }
    },
}
export default mockAPI
