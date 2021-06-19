import { InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'

import Logo from './Logo'

export default function Guest({ children }) {
	return (
		<div className="flex flex-col items-center min-h-screen pt-6 bg-gray-900 sm:justify-center sm:pt-0">
			<div>
				<InertiaLink href="/">
					<Logo className="w-20 h-20" />
				</InertiaLink>
			</div>

			<div className="w-full p-4 mt-6 overflow-hidden bg-gray-800 shadow-md sm:px-6 sm:max-w-md sm:rounded">
				{children}
			</div>
		</div>
	)
}
