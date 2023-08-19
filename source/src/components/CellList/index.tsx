import { useTypedSelector } from "../../hooks/use-typed-selector";
import CellListItem from "../CellListItem";

export default function CellList() {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderdeCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{renderdeCells}</div>;
}
