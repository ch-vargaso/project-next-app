import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'

type Props = {
    next: number | null
    prev: number | null
    router: NextRouter
    count: number
    pages: number
    pathname: string
}

const Pagination = ({ count, next, pages, prev, router, pathname }: Props) => {
    // const router = useRouter()
    const { query } = router
    const handleNext = useCallback(() => {
        if (!next) {
            //  if I have no next, nothing is going to happen... 
            return
        }
        router.push({ pathname: pathname, query: { ...query, page: next } })
    }, [next, pathname, query, router])
    console.log('router :>> ', router);
    console.log('next :>> ', next);

    const handlePrev = useCallback(() => {
        if (!prev) {
            return
        }
        router.push({ pathname, query: { ...query, page: prev } })
    }, [prev, pathname, query, router])

    //  leer de esto...

    return (
        <div>
            <div className='container_info'>
                <p>{`Showing ${count} results`}</p>
                <p>{`Page ${query.page || 1} out of ${pages}`}</p>
            </div>

            <div className='container_pagination_btn' >
                <button onClick={handlePrev}>Prev</button>
                <button onClick={handleNext} >Next</button>
                {/* <Link href={`/experiment?page=${next}`} >next</Link> */}
            </div>


        </div>
    )
}



export default Pagination