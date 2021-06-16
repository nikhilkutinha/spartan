import { usePage } from '@inertiajs/inertia-react'
import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons'
import React, { useEffect, useState } from 'react'

function ButtonClose({ onClick }) {
	return (
		<button onClick={onClick} className="p-2 mr-2 focus:outline-none group">
			<IconX className="w-5 h-5 text-white" />
		</button>
	)
}

export default function FlashMessage() {
	const [visible, setVisible] = useState(true)
	const { flash, errors } = usePage().props
	const numOfErrors = Object.keys(errors).length

	useEffect(() => {
		setVisible(true)
	}, [flash, errors])

	return (
		<div className="fixed bottom-0 right-0 z-50 w-full max-w-xl p-4">
			{flash.success && visible && (
				<div className="flex items-center justify-between mb-8 bg-green-500 rounded bg-opacity-90">
					<div className="flex items-center">
						<IconCheck className="w-5 h-5 ml-4 mr-2 text-white" />
						<div className="py-4 text-sm font-medium text-white">
							{flash.success}
						</div>
					</div>
					<ButtonClose onClick={() => setVisible(false)} />
				</div>
			)}
			{(flash.error || numOfErrors > 0) && visible && (
				<div className="flex items-center justify-between mb-8 bg-red-500 rounded">
					<div className="flex items-center">
						<IconAlertCircle className="w-5 h-5 ml-4 mr-2 text-white" />
						<div className="py-4 text-sm font-medium text-white">
							{flash.error && flash.error}
							{numOfErrors === 1 && 'There is one form error'}
							{numOfErrors > 1 &&
                                `There are ${numOfErrors} form errors.`}
						</div>
					</div>
					<ButtonClose
						className="mr-6"
						onClick={() => setVisible(false)}
					/>
				</div>
			)}
		</div>
	)
}
