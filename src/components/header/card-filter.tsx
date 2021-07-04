import { SearchIcon } from '@heroicons/react/outline'

export default function CardFilter(props: any) {

  return (
    <span className="w-screen md:w-1/3 h-10 focus:bg-gray-800 bg-gray-700 cursor-pointer text-sm rounded-full flex">
        <SearchIcon height={20} width={20} color={'#777'} style={{marginTop: 10, marginLeft: 15}} />
      <input 
        type="search" 
        name="serch" 
        placeholder="Search" 
        style={{boxShadow: 'none'}}
        onChange={props.onChangeHandler}
        className="
          focus:outline-none 
          focus:border 
          flex-grow 
          px-4 
          border-0 
          rounded-l-full 
          text-gray-100 
          bg-gray-700 
          rounded-r-full 
          text-sm
          font-bold
          " 
        />
    </span>
  )
}