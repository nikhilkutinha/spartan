import { InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'

export default function NavLink({ children, className, active = false, href }) {
	const styles = () => {
		return active
			? 'bg-gray-700 border-red-500 text-white'
			: 'border-transparent text-gray-400'
	}

	return (
		<InertiaLink
			href={href}
			className={`${className} ${styles()} block px-4 py-2 border-l-[3px] transition hover:text-white focus:text-white`}
		>
			{children}
		</InertiaLink>
	)
}
