import { alphabeticalArrangement } from '@/utils/data'
import Link from 'next/link'
import React, { useState } from 'react'

const AlphabetGrouping = () => {
    const [allCharacters] = useState(alphabeticalArrangement)
  return (
    <div className='grid grid-cols-5 p-6 gap-6 max-w-[355px] w-full border border-gray-custom-1200 rounded-md'>
            {allCharacters.map(char => 

                <Link href={`#${char.toLowerCase()}`} className='h-10 w-10 text-lg' >
                    {char}
                </Link>
            )}
    </div>
  )
}

export default AlphabetGrouping