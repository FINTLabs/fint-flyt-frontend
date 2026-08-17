import { Button, VStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router";

import { RouteComponent } from "../routes/Route";
import PageTemplate from '../shared/components/layout/PageTemplate';

const ForbiddenPage: RouteComponent = () => {
  const { t } = useTranslation("translations", {
    keyPrefix: "pages.forbidden",
  });

  return (
    <PageTemplate id={"forbidden"} keyPrefix={"pages.forbidden"} customHeading={true} >
      <VStack align={"center"} justify={"center"}>
        <h1>Error 401</h1>
        <p>{t('status')}</p>
        <Button as={RouterLink} to={"./"}>
          {t('return')}
        </Button>
      </VStack>
    </PageTemplate>
  );
};

export default ForbiddenPage;
