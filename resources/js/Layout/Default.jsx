import React from 'react'

import Navbar from './Navbar'

export default function Layout({ header, children }) {
	return (
		<div>
			<Navbar />

			{header && (
				<header className="bg-gray-800 border-t border-gray-700 shadow">
					<div className="container flex items-center min-h-full px-4 mx-auto h-[4.5rem] sm:px-6 lg:px-8">
						{header}
					</div>
				</header>
			)}

			<main>{children}</main>
		</div>
	)
}
