import Card from "@/shared/components/card/Card";
import type { Category } from "../types/category";
import Text from "@/shared/components/text/Text";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/button/Button";
import { useTranslation } from "react-i18next";

type Props = {
  category: Category;
  onEditCategory: (id: number) => void;
  onRemoveCategory: (id: number) => void;
};

const CategoryCard = ({
  category,
  onEditCategory,
  onRemoveCategory,
}: Props) => {
  const { t } = useTranslation("categories");
  return (
    <Card className="flex flex-col gap-4" color="default">
      <div>
        <div className="flex justify-between items-center">
          <Text as="h3" variant="heading3">
            {category.name}
          </Text>
          <Button
            color="error"
            variant="outlined"
            size="icon"
            onClick={() => onRemoveCategory(category.id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          startIcon={<Edit className="size-4" />}
          color="primary"
          size="sm"
          onClick={() => onEditCategory(category.id)}
        >
          {t("page.button.update")}
        </Button>
      </div>
    </Card>
  );
};

export default CategoryCard;
