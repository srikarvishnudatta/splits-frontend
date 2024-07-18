import { inputTypes } from "../types/types"
function Input({type,value,handleChange,  ...rest}: inputTypes) {
    
  return (
    <input type={type} {...rest} value={value} 
    onChange={handleChange}
    />
  )
}

export default Input