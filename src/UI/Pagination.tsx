interface IPagination {
    apdatePage: (x: number, type: string) => void,
    pages: number[],
    currentPage: number
}

function Pagination(props: IPagination) {
    return ( 
        <div className="pagination">
            <div className='prev' onClick={() => props.apdatePage(-1, 'arrow')}>
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2.28571L3.375 8L9 13.7143L7.875 16L2.54292e-07 8L7.875 9.83506e-08L9 2.28571Z" fill="#FFC85E"/>
                </svg>
            </div>

            {props.pages.map(page => {
                return <div className={page===props.currentPage ? 'pagination__item current' : 'pagination__item'} onClick={() => props.apdatePage(page, 'num')}><span>{page}</span></div>
            })}

            <div className='next' onClick={() => props.apdatePage(1, 'arrow')}>                        
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 13.7143L5.625 8L0 2.28571L1.125 0L9 8L1.125 16L0 13.7143Z" fill="#FFC85E"/>
                </svg>
            </div>
        </div>
     );
}

export default Pagination;