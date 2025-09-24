import { useParams, useNavigate, useLocation } from "react-router-dom";

export function withRouter(Component) {
    return props => {
        const params = useParams();
        const navigate = useNavigate();
        const location = useLocation();
        return <Component {...props} router={{ params, navigate, location }} />;
    };
}
