import { useParams } from "react-router";
import ProductUpdate from "../components/ProductUpdate";
import ProductCreate from "../components/ProductCreate";
import Card from "@/shared/components/card/Card";
import Container from "@/shared/components/container/Container";
import PageTitle from "@/shared/components/page/PageTitle";
import { useTranslation } from "react-i18next";
import ButtonBackView from "@/shared/components/button/ButtonBackView";

const ProductItemPage = () => {
  const { id } = useParams();
  const { t } = useTranslation("products");

  return (
    <Container>
      <div>
        <ButtonBackView />
      </div>
      <div className="flex-1 flex items-center">
        <Container size="4xl" className="mx-auto">
          <Card padding="lg">
            <div className="flex flex-col gap-8">
              <PageTitle
                title={
                  id ? t("form.page.title.edit") : t("form.page.title.create")
                }
              />
              {id ? <ProductUpdate id={id} /> : <ProductCreate />}
            </div>
          </Card>
        </Container>
      </div>
    </Container>
  );
};

export default ProductItemPage;
