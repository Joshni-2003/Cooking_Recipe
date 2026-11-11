import { Link } from 'react-router-dom';

function Unauthorized() {

    return (
        <div className="unauthorized-page">

            <h1>Access Denied!</h1>

            <p>
                Sorry, you don't have permission
                to access this page.
            </p>

            <Link to="/">
                Go to Home
            </Link>

        </div>
    );
}

export default Unauthorized;