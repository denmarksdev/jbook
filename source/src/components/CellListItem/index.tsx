import React from 'react'
import { Cell } from '../../state/cell'
import CodeCell from '../CodeCell'
import TextEditor from '../TextEditor'

interface CellListItemProps {
  cell: Cell
}

export default function CellListItem({cell}: CellListItemProps) {
  let child: JSX.Element;
  if (cell.type ===  'code'){
    child = <CodeCell key={cell.id} cell={cell}  />
  }else{
    child = <TextEditor key={cell.id}  cell={cell} />
  }

  return <div>{child}</div>
}
