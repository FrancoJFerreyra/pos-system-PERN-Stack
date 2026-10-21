import { Button } from "./Button";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

type Props = {
  className?: string;
};

const ButtonBackView = ({ className }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  return (
    <Button
      startIcon={<ArrowLeft className="size-4" />}
      color="secondary"
      onClick={onBack}
      className={className ? className : undefined}
    >
      {t("page.button.back")}
    </Button>
  );
};

export default ButtonBackView;
