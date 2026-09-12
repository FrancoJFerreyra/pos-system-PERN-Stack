import Card from "@/shared/components/card/Card";
import type { Product } from "../types/product";
import Text from "@/shared/components/text/Text";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/button/Button";
import { useTranslation } from "react-i18next";
import { formatToCurrency } from "@/shared/utils/currency.utils";

type Props = {
  onEditProduct: (id: number) => void;
  onRemoveProduct: (id: number) => void;
  product: Product;
};

const ProductCard = ({ product, onRemoveProduct, onEditProduct }: Props) => {
  const { t } = useTranslation("products");
  return (
    <Card className="flex flex-col gap-4" color="default">
      <div>
        <div className="flex justify-between items-center">
          <Text as="h3" variant="heading3">
            {product.name}
          </Text>
          <Button
            color="error"
            variant="outlined"
            size="icon"
            onClick={() => onRemoveProduct(product.id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Text as="p" variant="body">
            {product.description}
          </Text>
          <Text as="span" variant="price">
            {formatToCurrency(product.price)}
          </Text>
        </div>
        <Text as="span" variant="muted">
          {product.sku}
        </Text>
      </div>
      <div className="flex justify-center">
        <Button
          startIcon={<Edit className="size-4" />}
          color="primary"
          size="sm"
          onClick={() => onEditProduct(product.id)}
        >
          {t("page.button.update")}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
