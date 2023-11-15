import dynamic from "next/dynamic";

type Props = {
  color?: string;
};

export default function GridSpinner({ color = "red" }: Props) {
  const GridLoader = dynamic(
    () => import("react-spinners").then((lib) => lib.GridLoader),
    {
      ssr: false,
    }
  );
  return <GridLoader color={color} />;
}
