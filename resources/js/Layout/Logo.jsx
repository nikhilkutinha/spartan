import React from 'react'

export default function Logo() {
	return (
		<div className="flex items-center">
			<img className="h-11" src="/images/logo.svg" alt="Workflow" />
			<span className="ml-3 text-3xl font-semibold tracking-widest text-white font-megrim">
                IFD
			</span>
		</div>
	)
}
