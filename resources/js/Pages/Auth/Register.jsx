import { InertiaLink, useForm } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

import Auth from '@/Layout/Auth'
import Button from '@/Shared/Button'
import Field from '@/Shared/Field'
import Input from '@/Shared/Input'

export default function Register() {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	})

	useEffect(() => {
		return () => {
			reset('password', 'password_confirmation')
		}
	}, [])

	const onChange = (event) => {
		setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
	}

	const submit = (e) => {
		e.preventDefault()

		post(route('register'))
	}

	return (
		<Auth>
			{/* <ValidationErrors errors={errors} /> */}

			<form className="space-y-4" onSubmit={submit}>
           
				<Field htmlFor="email" label="Email" error={errors.name}>
					<Input
						type="text"
						name="email"
						id="email"
						value={data.email}
						className="block w-full mt-1"
						autoComplete="off"
						isFocused={true}
						isInvalid={errors.name}
						onChange={onChange}
					/>
				</Field>
			

		
				<Field htmlFor="password" label="Password" error={errors.password}>
					<Input
						type="password"
						name="password"
						id="password"
						value={data.password}
						className="block w-full mt-1"
						isInvalid={errors.password}
						onChange={onChange}
					/>
				</Field>
			

              
				<Field htmlFor="password_confirmation" label="Password confirmation">
					<Input
						type="password"
						name="password_confirmation"
						id="password_confirmation"
						value={data.password_confirmation}
						className="block w-full mt-1"
						onChange={onChange}
					/>
				</Field>
				

				<div className="flex items-center justify-end">
					<InertiaLink href={route('login')} className="text-sm text-gray-100 underline">
                        Already registered?
					</InertiaLink>

					<Button type="submit" className="ml-4" disabled={processing}>
                        Register
					</Button>
				</div>
			</form>
		</Auth>
	)
}
