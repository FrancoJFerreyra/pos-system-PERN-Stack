import Text from "../text/Text";

type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => {
  return (
    <div className="flex flex-col gap-2 mx-auto">
      <Text as="h1" variant="heading1">
        {title}
      </Text>
    </div>
  );
};

export default PageTitle;
