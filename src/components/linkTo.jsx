import {Link} from "react-router-dom";

const LinkTo = ( {page, label, className} ) => {
    return (
        <Link to={ page ? "/" + page : "/"} className={ className ? className : "none-NA"}>
            {label ? <span title={`Go to ${label} page`}>{label}</span> : null}
        </Link>
    )
}

export default LinkTo