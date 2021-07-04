import React,{ useMemo } from 'react'
import { withRouter } from 'react-router'
import debounce from 'lodash/debounce';
import { MenuIcon } from '@heroicons/react/outline'
import CardFilter from './card-filter';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Owned', href: '#', current: false },
  { name: 'Github', href: '#', current: false },
  { name: 'Author', href: '#', current: false },
  { name: 'Explore', href: '/explorer', current: true },
]

function Header({ history }: any) {

  const debouncedSearchChangeHandler = useMemo(
    () => {
      const searchChangeHandler = (event: any) => {
        const search: string = event.target.value
    
        if (search.length ===  0) {
          history.push(`/explorer`)
        } else {
          history.push(`/explorer/?s=${encodeURI(search)}`)
        }
      };

      return debounce(searchChangeHandler, 500)
    }, [history]
  );

  return <>
    <div className="w-screen flex flex-row items-center p-1 shadow-xs p-4">
      <div className="ml-4 mr-8 text-lg text-gray-100 hidden font-bold md:flex">
        <Link to="/">
          <img src={process.env.REACT_APP_BUCKET_URL + "/images/logo.png"} alt="logo" />
        </Link>        
      </div>
      <CardFilter onChangeHandler={debouncedSearchChangeHandler} />
      <div className="flex flex-row-reverse mr-4 ml-4 md:hidden">
        <MenuIcon color="lightgrey" height={40} width={40} cursor={'pointer'} />
      </div >
        <div className="flex flex-row-reverse mr-8 hidden md:flex">
          {navigation.map(n => 
          <Link to={n.href}>
            <div key={n.name} className="text-gray-100 font-bold text-center text-sm px-4 py-2 ">{n.name}</div>
          </Link>
          )}
        </div>
    </div>
  </>
}

export default withRouter(Header);