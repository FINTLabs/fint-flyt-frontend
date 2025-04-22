import { useContext } from 'react';
import { AuthorizationContext } from '../../context/AuthorizationContext';

const Logout = () => {
    const { logout } = useContext(AuthorizationContext);

    logout(); // Call logout immediately

    return <p>Logging out...</p>;
};

export default Logout;
