import React from 'react';
import { navData } from '@/constants/homedata';
import Link from 'next/link';

const HomeNav = () => {

  return (
    <div className='flex justify-between p-5'>
        
        {
            navData.map(data => (
                <div key={data.text} className='flex flex-col justify-center items-center'>
                  <Link href ={data?.link}>
                    <img src={data.url} alt='nav' className='w-28 h-24' />
                    <p className='font-semibold'>{data.text}</p>
                    </Link>

                </div>
            ))
        }
    </div>
  );
}

export default HomeNav;
