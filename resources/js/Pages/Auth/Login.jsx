import { InertiaLink, useForm } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

import Auth from '@/Layout/Auth'
import Button from '@/Shared/Button'
import Checkbox from '@/Shared/Checkbox'
import Field from '@/Shared/Field'
import Input from '@/Shared/Input'


export default function Login({ status, canResetPassword }) {
	const { data, setData, post, processing, reset } = useForm({
		email: '',
		password: '',
		remember: '',
	})

	useEffect(() => {
		return () => {
			reset('password')
		}
	}, [])

	const onChange = (event) => {
		setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
	}

	const submit = (e) => {
		e.preventDefault()

		post(route('login'))
	}

	return (
		<Auth>
			{status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

			<form onSubmit={submit} autoComplete="off" className="space-y-4">

				<Field htmlFor="email" label="Email">
					<Input
						type="text"
						name="email"
						id="email"
						value={data.email}
						className="block w-full mt-1"
						autoComplete="username"
						isFocused={true}
						onChange={onChange}
					/>
				</Field>
			

			
				<Field htmlFor="password" label="Password">
					<Input
						type="password"
						name="password"
						id="password"
						value={data.password}
						className="block w-full mt-1"
						autoComplete="current-password"
						onChange={onChange}
					/>
				</Field>
				

				<label className="flex items-center">
					<Checkbox name="remember" value={data.remember} onChange={onChange} />

					<span className="ml-2 text-sm text-gray-200">Remember me</span>
				</label>
			

				<div className="flex items-center justify-end">
					{canResetPassword && (
						<InertiaLink
							href={route('password.request')}
							className="text-sm text-gray-100 underline"
						>
                            Forgot your password?
						</InertiaLink>
					)}

					<Button className="ml-4" disabled={processing} type="submit">
                        Log in
					</Button>
				</div>
			</form>
		</Auth>
	)
}
