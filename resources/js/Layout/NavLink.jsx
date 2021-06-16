import { InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'

export default function NavLink({ children, active = false, href, className }) {
	const styles = () => {
		return active
			? 'border-red-500 text-white focus:border-red-500'
			: 'border-transparent text-gray-400'
	}

	return (
		<InertiaLink
			href={href}
			className={`${styles()} ${className} inline-flex items-center px-1 pt-1 text-sm font-medium border-b-[3px] transition focus:text-white hover:text-white`}
		>
			{children}
		</InertiaLink>
	)
}
