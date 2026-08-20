import ValueConverting from '../features/valueConverting/ValueConverting';
import { RouteComponent } from '../routes/Route';
import PageTemplate from '../shared/components/layout/PageTemplate';

const ValueConvertingPage: RouteComponent = () => 
<PageTemplate
    id={'valueConverting'}
    keyPrefix={'pages.valueConverting'}
    headingHelpTextKey="help.header"
>
    <ValueConverting />
</PageTemplate>

export default ValueConvertingPage;
