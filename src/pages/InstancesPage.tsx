import { TableSelectProvider } from '../features/instances/batchProcess/TableSelectContext';
import { FilterProvider } from '../features/instances/filter/FilterContext';
import { FilterOptionsProvider } from '../features/instances/filter/OptionsContext';
import Instances from '../features/instances/Instances';
import { RouteComponent } from '../routes/Route';
import PageTemplate from '../shared/components/layout/PageTemplate';

const InstancesPage: RouteComponent = () => (
    <FilterProvider>
        <FilterOptionsProvider>
            <TableSelectProvider>
                <PageTemplate
                    id={'instances'}
                    keyPrefix={'pages.instances'}
                    headingHelpTextKey="help.header"
                >
                    <Instances />
                </PageTemplate>
            </TableSelectProvider>
        </FilterOptionsProvider>
    </FilterProvider>
);

export default InstancesPage;
