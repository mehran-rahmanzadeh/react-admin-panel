import React from "react";

const Pagination = (props) => {
    return <nav className="table-bottom-center-pagination" aria-label="Page navigation example ">
        <ul className="pagination">
            <li className="page-item">
                <button className="page-link" onClick={props.onPrevious} aria-label="Previous" disabled={props.isPreviousDisabled}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </button>
            </li>
            <li className="page-item">
                <button className="page-link" onClick={props.onNext} aria-label="Next" disabled={props.isNextDisabled}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                </button>
            </li>
        </ul>
    </nav>
}

export default Pagination;