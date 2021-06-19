import { useForm } from '@inertiajs/inertia-react'
import React from 'react'

import Dashboard from '@/Layout/Dashboard'
import Button from '@/Shared/Button'
import Field from '@/Shared/Field'
import FormSection from '@/Shared/FormSection'
import Input from '@/Shared/Input'

export default function Create() {
	const { data, setData, errors, post, processing } = useForm({
		name: '',
		url: '',
		agent: 'App\\Agents\\',
	})

	const createGame = (e) => {
		e.preventDefault()
		post(route('dashboard.vendors.store'))
	}

	return (
		<Dashboard header="Create Vendor">
			<FormSection
				title="Vendor Information"
				description={<>Please ensure that your information is valid.</>}
			>
				<form className="space-y-6" onSubmit={createGame}>
					<div className="grid grid-cols-3 gap-4">
						<Field
							htmlFor="name"
							label="Name"
							className="col-span-3 xl:col-span-2"
						>
							<Input
								name="name"
								error={errors.name}
								value={data.name}
								required
								autoComplete="off"
								onChange={(e) =>
									setData('name', e.target.value)
								}
							/>
						</Field>
						<Field
							htmlFor="url"
							label="URL"
							className="col-span-3 xl:col-span-2"
						>
							<Input
								name="name"
								error={errors.url}
								value={data.url}
								required
								type="url"
								autoComplete="off"
								onChange={(e) => setData('url', e.target.value)}
							/>
						</Field>
						<Field
							htmlFor="agent"
							label="Agent"
							className="col-span-3 xl:col-span-2"
						>
							<Input
								name="name"
								error={errors.agent}
								value={data.agent}
								required
								autoComplete="off"
								onChange={(e) =>
									setData('agent', e.target.value)
								}
							/>
						</Field>
					</div>

					<Button type="submit" disabled={processing}>
                        Create vendor
					</Button>
				</form>
			</FormSection>
		</Dashboard>
	)
}
