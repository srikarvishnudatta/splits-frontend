import { ButtonType } from "../types/types"

function Button(props: ButtonType) {
  return (
    <button onClick={props.onClick}
    className={!props.textOnly ? "custom-button" : "text-only-button"}
    type={props.type}
    style={{borderRadius: props.borderRadius}}
    >{props.text}</button>
  )
}

export default Button