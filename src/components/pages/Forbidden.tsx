import { useTranslation } from "react-i18next";
import { RouteComponent } from "../../routes/Route";
import PageTemplate from "../templates/PageTemplate";
import { Link as RouterLink } from "react-router-dom";
import { Button, VStack } from "@navikt/ds-react";

const Forbidden: RouteComponent = () => {
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

export default Forbidden;
