export function Th({ children, className = '' }) {
    return <th className={`px-4 py-3 font-semibold ${className}`}>{children}</th>
}

export function Td({ children, className = '' }) {
    return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>
}
