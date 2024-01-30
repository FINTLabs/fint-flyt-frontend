import React from 'react';
import PageTemplate from "../templates/PageTemplate";
import {RouteComponent} from "../../routes/Route";
import {Test} from "../../features/configuration/components/common/customField/Test";
import { HTML5Backend } from 'react-dnd-html5-backend'
import {DndProvider} from "react-dnd";

const TestPage: RouteComponent = () => {

    return (
        <DndProvider backend={HTML5Backend}>
            <PageTemplate id={'version'} keyPrefix={'pages'}>
                <Test/>
            </PageTemplate>
        </DndProvider>

    );
}
export default TestPage;