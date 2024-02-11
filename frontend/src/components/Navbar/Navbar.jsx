import { Fragment, useContext, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo_main.png'
import "./navbar.css"
import { isLogged } from '../../contexts/IsloggedIn'
// const navigation = [
//   { name: 'HOME', href: '/', current: false },
//   { name: 'Community', href: '/community', current: false },
//   { name: 'Markets', href: '/markets', current: false },
//   { name: 'Trades', href: '/trades', current: false },
//   { name: 'Social', href: '/social', current: false },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const location = useLocation().pathname
    const navigate = useNavigate();
    const isLoggedContext = useContext(isLogged)
    const [data, setData] = useState(null)
    useEffect(()=>{
        if(window.localStorage.getItem('authToken')) {
          fetch("http://localhost:3001/auth/fetchuser",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token" : window.localStorage.getItem('authToken')
            }
          })
          .then((res)=>res.json())
          .then((data)=>{
              setData(data)
              console.log(data)
          })
        }
    },[window.localStorage.getItem('authToken')])

    const navigation = [
        { name: 'HOME', href: '/', current: location==='/' },
        { name: 'Community', href: '/community', current: location==='/community' },
        { name: 'Markets', href: '/markets', current: location==='/markets' },
        { name: 'Trades', href: '/trades', current: location==='/trades' },
        { name: 'Social', href: '/social', current: location==='/social' },
    ]

    const islogged = window.localStorage.getItem('isLoggedIn')
  return (
    <Disclosure as="nav" className="bg-gray-800 fixed-top">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    style={{borderRadius:'50%'}}
                    className="h-8 w-auto"
                    src={logo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link
                  to='#'
                  type='button'
                  className="mx-2 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">2</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </Link>


                {/* Profile dropdown */}
                {
                    !islogged && !isLoggedContext.IsloggedInState?
                    <div className="rounded px-2 py-1 mx-3 hover:cursor-pointer hover:scale-105 login">
                        <Link to='/login'>Login</Link>
                    </div>
                    :
                    <Menu as="div" className="relative ml-3">
                    <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-8 w-8 rounded-full"
                            src={!data || data.userData.image==null?"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80":data.userData.image}
                            alt=""
                        />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                            <Link
                                to="/profile"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Your Profile
                            </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <Link
                                to="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Settings
                            </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <Link
                                type='button'
                                to="/"
                                onClick={()=>{
                                    window.localStorage.removeItem('isLoggedIn')
                                    window.localStorage.removeItem('authToken')
                                    isLoggedContext.setIsloggedInState(false)
                                    window.location.reload();
                                }}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Sign out
                            </Link>
                            )}
                        </Menu.Item>
                        </Menu.Items>
                    </Transition>
                    </Menu>
                }
                </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
