import React from "react";
import './Pagination.scss';

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <div className="pagination">
            <ul className="pagination__list">
                {currentPage - 1 >= 1 ? <li><button onClick={() => paginate(currentPage - 1)} href=""><i class="fa-solid fa-arrow-left"></i></button></li> : <></>}

                {pageNumber.map((number) => {
                    if (number <= 5 && currentPage < 5) {
                        return (
                            <li key={number}>
                                <button onClick={() => paginate(number)} className={number === currentPage ? 'active' : ''}>{number}</button>
                            </li>
                        )
                    }
                    if (number >= Math.ceil(totalPosts / postsPerPage) - 4 && currentPage > Math.ceil(totalPosts / postsPerPage) - 4) {
                        return (
                            <li key={number}>
                                <button onClick={() => paginate(number)} className={number === currentPage ? 'active' : ''}>{number}</button>
                            </li>
                        )
                    }
                    if (number === currentPage || number === currentPage - 1 || number === currentPage + 1 || number == 1 || number == Math.ceil(totalPosts / postsPerPage)) {
                        if (number === 1) {
                            return (
                                <><li key={number}>
                                    <button onClick={() => paginate(number)} className={number === currentPage ? 'active' : ''}>{number}</button>
                                </li>
                                    <li><button disabled>...</button></li></>
                            )
                        } else if (number == Math.ceil(totalPosts / postsPerPage)) {
                            return (
                                <>
                                    <li><button disabled>...</button></li>
                                    <li key={number}>
                                        <button onClick={() => paginate(number)} className={number == currentPage ? 'active' : ''}>{number}</button>
                                    </li>
                                </>
                            )
                        }
                        else {
                            return (
                                <li key={number}>
                                    <button onClick={() => paginate(number)} className={number == currentPage ? 'active' : ''}>{number}</button>
                                </li>
                            )
                        }
                    }

                })}

                {currentPage + 1 <= Math.ceil(totalPosts / postsPerPage) ? <li><button onClick={() => paginate(currentPage + 1)} href=""><i class="fa-solid fa-arrow-right"></i></button></li> : <></>}
            </ul>
        </div>
    )
}

export default Pagination;