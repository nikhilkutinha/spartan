import { useForm, usePage } from '@inertiajs/inertia-react'
import React from 'react'

import Dashboard from '@/Layout/Dashboard'
import Button from '@/Shared/Button'
import Field from '@/Shared/Field'
import FormSection from '@/Shared/FormSection'
import Input from '@/Shared/Input'

export default function Edit() {
	const { vendor } = usePage().props

	const {
		data: form,
		setData,
		errors,
		put,
		processing,
	} = useForm({
		name: vendor.name || '',
		agent: vendor.agent || '',
		url: vendor.url || '',
	})

	const createVendor = (e) => {
		e.preventDefault()
		put(route('dashboard.vendors.update', vendor.id))
	}

	return (
		<Dashboard header="Edit Vendor">
			<FormSection
				title="Primary Information"
				description="
                        Please ensure that the information you are about to add is valid
                        and reliable."
			>
				<form className="space-y-6" onSubmit={createVendor}>
					<div className="grid grid-cols-3 gap-4">
						<Field
							htmlFor="name"
							label="Name"
							className="col-span-3 xl:col-span-2"
						>
							<Input
								name="name"
								error={errors.name}
								value={form.name}
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
								value={form.url}
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
								value={form.agent}
								required
								autoComplete="off"
								onChange={(e) =>
									setData('agent', e.target.value)
								}
							/>
						</Field>
					</div>

					<Button type="submit" disabled={processing}>
                        Edit vendor
					</Button>
				</form>
			</FormSection>
		</Dashboard>
	)
}
