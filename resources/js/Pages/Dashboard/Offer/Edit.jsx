import { useForm, usePage } from '@inertiajs/inertia-react'
import React from 'react'

import { useAutocomplete } from '@/hooks'
import Dashboard from '@/Layout/Dashboard'
import Autocomplete from '@/Shared/Autocomplete'
import Button from '@/Shared/Button'
import Field from '@/Shared/Field'
import Select from '@/Shared/Form/Select'
import FormSection from '@/Shared/FormSection'
import Input from '@/Shared/Input'

export default function Edit() {
	const { offer } = usePage().props

	const {
		data: form,
		errors,
		processing,
		setData,
		put,
		transform,
	} = useForm({
		vendor: offer.vendor || '',
		game: offer.game || '',
		edition_id: offer.edition_id,
		url: offer.url || '',
	})

	const editOffer = (e) => {
		e.preventDefault()

		transform((data) => ({
			url: data.url,
			edition_id: data.edition_id,
			game_id: data.game.id,
			vendor_id: data.vendor.id,
		}))

		put(route('dashboard.offers.update', offer.id))
	}

	return (
		<Dashboard header={'Edit Offer'}>
			<FormSection
				title="Offer Information"
				description="Please ensure that the information you're about to add is valid and reliable."
			>
				<form className="space-y-6" onSubmit={editOffer}>
					<div className="grid grid-cols-3 gap-4">
						<Field
							htmlFor="game"
							label="Game"
							className="col-span-3 sm:col-span-2"
						>
							<Autocomplete
								value={form.game}
								loadOptions={(q, { page }) =>
									useAutocomplete(q, page, 'api.games.index')
								}
								getOptionLabel={(option) => option.title}
								onChange={(value) => setData('game', value)}
							/>
						</Field>

						{form.game.editions.length > 0 && (
							<Field
								htmlFor="edition"
								label="Edition"
								help={
									<>
                                        Please consider{' '}
										<a
											target="_blank"
											className="text-red-500"
											href={route(
												'dashboard.editions.create'
											)}
											rel="noreferrer"
										>
                                            creating
										</a>{' '}
                                        a standard edition if multiple editions
                                        exist.
									</>
								}
								className="col-span-3 sm:col-span-2"
							>
								<Select
									value={form.edition_id}
									onChange={(e) =>
										setData('edition_id', e.target.value)
									}
								>
									<option value="" disabled>
                                        ---
									</option>
									{form.game.editions.map((edition) => (
										<option
											key={edition.id}
											value={edition.id}
										>
											{edition.name}
										</option>
									))}
								</Select>
							</Field>
						)}

						<Field
							htmlFor="vendor"
							label="Vendor"
							className="col-span-3 sm:col-span-2"
						>
							<Autocomplete
								value={form.vendor}
								loadOptions={(q, { page }) =>
									useAutocomplete(
										q,
										page,
										'api.vendors.index'
									)
								}
								getOptionLabel={(option) => option.name}
								onChange={(value) => setData('vendor', value)}
							/>
						</Field>

						<Field
							htmlFor="url"
							label="URL"
							className="col-span-3 sm:col-span-2"
						>
							<Input
								value={form.url}
								onChange={(e) => setData('url', e.target.value)}
								error={errors.url}
							/>
						</Field>
					</div>

					<Button type="submit" disabled={processing}>
                        Edit Offer
					</Button>
				</form>
			</FormSection>
		</Dashboard>
	)
}
