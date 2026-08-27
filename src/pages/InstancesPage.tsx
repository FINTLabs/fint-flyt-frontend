import { TableSelectProvider } from '../features/instances/batchProcess/TableSelectContext';
import { InstanceFilterProvider } from '../features/instances/filter/FilterContext';
import { FilterOptionsProvider } from '../features/instances/filter/OptionsContext';
import Instances from '../features/instances/Instances';
import { RouteComponent } from '../routes/Route';
import PageTemplate from '../shared/components/layout/PageTemplate';

const InstancesPage: RouteComponent = () => (
    <InstanceFilterProvider>
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
    </InstanceFilterProvider>
);

export default InstancesPage;
