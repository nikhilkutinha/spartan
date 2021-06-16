import React from 'react'

export default function FormSection({ children, title, description }) {
	return (
		<div className="md:grid md:grid-cols-3 md:gap-6">
			<div className="md:col-span-1">
				<div className="px-4 sm:px-0">
					<h3 className="text-lg font-medium text-white leading-6">
						{title}
					</h3>
					<p className="mt-2 text-sm text-gray-300">{description}</p>
				</div>
			</div>
			<div className="mt-5 md:mt-0 md:col-span-2">
				<div className="rounded shadow sm:overflow-hidden">
					<div className="px-4 py-5 bg-gray-800 sm:p-6">
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}
