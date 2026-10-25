import { useParams } from "react-router";
import CategoryUpdate from "../components/CategoryUpdate";
import CategoryCreate from "../components/CategoryCreate";
import Card from "@/shared/components/card/Card";
import Container from "@/shared/components/container/Container";
import PageTitle from "@/shared/components/page/PageTitle";
import { useTranslation } from "react-i18next";
import ButtonBackView from "@/shared/components/button/ButtonBackView";

const CategoryItemPage = () => {
  const { id } = useParams();
  const { t } = useTranslation("categories");

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
              {id ? <CategoryUpdate id={id} /> : <CategoryCreate />}
            </div>
          </Card>
        </Container>
      </div>
    </Container>
  );
};

export default CategoryItemPage;
