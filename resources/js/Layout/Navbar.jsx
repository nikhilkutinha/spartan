import { IconMenu2, IconX, IconChevronDown } from '@tabler/icons'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import { useState } from 'react'

import Dropdown from '@/Shared/Dropdown'
import Logo from './Logo'
import NavLink from './NavLink'
import ResponsiveNavLink from './ResponsiveNavLink'

export default function Navbar() {
	const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false)

	const { auth } = usePage().props

	return (
		<nav className="bg-gray-800">
			<div className="container px-2 mx-auto sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<button
							onClick={() =>
								setShowingNavigationDropdown(
									!showingNavigationDropdown
								)
							}
							type="button"
							className="inline-flex items-center justify-center p-2 text-gray-400 rounded hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						>
							{showingNavigationDropdown ? (
								<IconX className="block w-6 h-6" />
							) : (
								<IconMenu2 className="block w-6 h-6" />
							)}
						</button>
					</div>

					<div className="flex items-center justify-center flex-1 h-16 sm:items-stretch sm:justify-start">
						<div className="flex items-center flex-shrink-0">
							<InertiaLink
								href={route('home')}
								className="flex items-center"
							>
								<Logo />
							</InertiaLink>
						</div>

						<div className="hidden space-x-6 sm:-my-px sm:ml-10 sm:flex">
							<NavLink active={route().current('home')} href={route('home')}>
                                Browse
							</NavLink>
							{auth.user?.owner &&
								<NavLink href={route('dashboard')}>
                                	Dashboard
								</NavLink>
							}
						</div>
					</div>

					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<div className="relative ml-3">
							{ auth.user ?
							<Dropdown>
								<Dropdown.Trigger>
									<span className="inline-flex rounded">
										<button
											type="button"
											className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-100 focus:outline-none transition ease-in-out duration-150"
										>
											
											<img src={auth.user.profile_photo} className="h-10 w-10 rounded-full" />
											<IconChevronDown className="ml-2 -mr-0.5 h-4 w-4" />
										</button>
									</span>
								</Dropdown.Trigger>

								<Dropdown.Content>
									<Dropdown.Link href={route('logout')} method="post" as="button">
										Log Out
									</Dropdown.Link>
								</Dropdown.Content>
							</Dropdown>
							:
							<div className="hidden sm:block space-x-6">
								<NavLink href={route('login')} className="underline">
                                    Log in
								</NavLink>
								<NavLink href={route('register')} className="underline">
                                    Register
								</NavLink>
							</div>
							}
						</div>
					</div>
				</div>
			</div>

			{showingNavigationDropdown && (
				<div className="sm:hidden">
					<div className="pt-2 pb-3 space-y-1">
						<ResponsiveNavLink active={route().current('home')} href={route('home')}>Browse</ResponsiveNavLink>
						<ResponsiveNavLink href={route('dashboard')}>Dashboard</ResponsiveNavLink>
						<ResponsiveNavLink href={route('login')}>Login</ResponsiveNavLink>
						<ResponsiveNavLink href={route('register')}>Register</ResponsiveNavLink>
					</div>
				</div>
			)}
		</nav>
	)
}
