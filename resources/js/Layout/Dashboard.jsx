import { Transition } from '@headlessui/react'
import { InertiaLink } from '@inertiajs/inertia-react'
import { IconMenu2 } from '@tabler/icons'
import {
	IconBasket,
	IconCurrencyDollar,
	IconDeviceGamepad,
	IconVersions,
} from '@tabler/icons'
import React, { useEffect, useState } from 'react'

import FlashMessage from '@/Shared/FlashMessage'

import Logo from './Logo'
import ResponsiveNavLink from './ResponsiveNavLink'

function Aside() {
	return (
		<aside className="flex flex-col flex-grow pb-4 overflow-y-auto bg-gray-800">
			<div className="flex items-center flex-shrink-0 h-16 px-4">
				<InertiaLink href={route('home')}>
					<Logo />
				</InertiaLink>
			</div>
			<nav className="py-6 space-y-1.5">
				<ResponsiveNavLink
					active={route().current('dashboard.games.index')}
					href={route('dashboard.games.index')}
					className="flex items-center"
				>
					<IconDeviceGamepad />
					<span className="text-sm ml-2.5">Games</span>
				</ResponsiveNavLink>

				<ResponsiveNavLink
					active={route().current('dashboard.offers.index')}
					href={route('dashboard.offers.index')}
					className="flex items-center"
				>
					<IconCurrencyDollar />
					<span className="text-sm ml-2.5">Offers</span>
				</ResponsiveNavLink>

				<ResponsiveNavLink
					active={route().current('dashboard.vendors.index')}
					href={route('dashboard.vendors.index')}
					className="flex items-center"
				>
					<IconBasket />
					<span className="text-sm ml-2.5">Vendors</span>
				</ResponsiveNavLink>
				<ResponsiveNavLink
					active={route().current('dashboard.editions.index')}
					href={route('dashboard.editions.index')}
					className="flex items-center"
				>
					<IconVersions />
					<span className="text-sm ml-2.5">Editions</span>
				</ResponsiveNavLink>
			</nav>
		</aside>
	)
}

export default function Dashboard({ children, header }) {
	let [mobileOpen, setMobileOpen] = useState(false)

	useEffect(() => {
		function handleEscape(event) {
			if (!mobileOpen) return

			if (event.key === 'Escape') {
				setMobileOpen(false)
			}
		}

		document.addEventListener('keyup', handleEscape)
		return () => document.removeEventListener('keyup', handleEscape)
	}, [mobileOpen])

	return (
		<>
			<FlashMessage />
			<div className="flex h-screen overflow-hidden bg-cool-gray-900">
				{/* Off-canvas menu for mobile */}
				<Transition
					show={mobileOpen}
					unmount={false}
					className="fixed inset-0 z-40 flex lg:hidden"
				>
					{/* Off-canvas menu overlay, show/hide based on off-canvas menu state. */}
					<Transition.Child
						unmount={false}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						{() => (
							<div className="fixed inset-0">
								<div
									onClick={() => setMobileOpen(false)}
									className="absolute inset-0 bg-gray-900 opacity-75"
								/>
							</div>
						)}
					</Transition.Child>

					{/* Off-canvas menu, show/hide based on off-canvas menu state. */}
					<Transition.Child
						unmount={false}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
						className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800"
					>
						<div className="absolute top-0 right-0 p-1 -mr-14">
							<Transition.Child
								unmount={false}
								className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-cool-gray-600"
								aria-label="Close sidebar"
								as="button"
								onClick={() => setMobileOpen(false)}
							>
								<svg
									className="w-6 h-6 text-white"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</Transition.Child>
						</div>
						{Aside()}
					</Transition.Child>
					<div className="flex-shrink-0 w-14">
						{/* Dummy element to force sidebar to shrink to fit close icon */}
					</div>
				</Transition>

				<div className="hidden lg:flex lg:flex-shrink-0">
					<div className="flex flex-col w-64 ">{Aside()}</div>
				</div>
				<div
					className="flex-1 overflow-auto focus:outline-none"
					tabIndex={0}
				>
					<div className="relative z-10 flex flex-shrink-0 h-16 bg-gray-800 lg:hidden">
						<button
							className="px-4 focus:outline-none lg:hidden"
							aria-label="Open sidebar"
							onClick={() => setMobileOpen(true)}
						>
							<IconMenu2 className="w-6 h-6 text-gray-300" />
						</button>
					</div>

					<div className="relative flex items-center h-16 bg-gray-800 bg-gradient-to-r from-gray-900 bg-opacity-50">
						<div
							className="absolute inset-0 z-[-10]"
							style={{
								backgroundImage: 'url(/images/topography.svg)',
							}}
						></div>

						<div className="container px-4 mx-auto sm:px-6 lg:px-8">
							<h2 className="text-xl font-semibold text-white">
								{' '}
								{header}
							</h2>
						</div>
					</div>

					<main className="container relative flex-1 py-8 mx-auto sm:px-6 lg:px-8">
						{children}
					</main>
				</div>
			</div>
		</>
	)
}
