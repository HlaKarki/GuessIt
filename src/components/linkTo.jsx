import {Link} from "react-router-dom";
import React from "react";

const LinkTo = ( {page, label, className} ) => {
    return (
        <Link to={ page ? "/" + page : "/"} className={ className ? className : "none-NA"}>
            <span title={`Go to ${label} page`}>{label}</span>
        </Link>
    )
}

export default LinkTo