import {RouteComponent} from "../../routes/Route";
import PageTemplate from "../templates/PageTemplate";
import {useContext} from "react";
import {AuthorizationContext} from "../../context/AuthorizationContext";
import {useHistory} from "react-router-dom";
import {Label} from "@navikt/ds-react";

const Admin: RouteComponent = () => {
    const {isAdmin} = useContext(AuthorizationContext)
    const history = useHistory();

    if (!isAdmin) {
        history.push('/')
    }

    return (
        <PageTemplate id={'admin'} keyPrefix={'pages.admin'}>
            <Label>admin: {isAdmin ? 'true' : 'false'}</Label>
        </PageTemplate>
    )
}
export default Admin;
