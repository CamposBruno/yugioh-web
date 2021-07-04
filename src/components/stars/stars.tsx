import React from 'react'
import { StarIcon } from '@heroicons/react/solid'

export default function Explorer(props: any) {
  const level = parseInt(props.level) || 0;
  const stars = new Array(level).fill(<StarIcon className="h-6 w-6 text-indigo-500" aria-hidden="true" />)

  return (
    <div className="flex flex-dr">
      {stars.map(star => (star))}
    </div>
  )
}