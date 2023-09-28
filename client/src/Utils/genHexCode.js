import randomNum from "./randomNum"
const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]

const genHexCode = () => {
  let hex = "#"
  for (let i = 0; i < 6; i++) {
    hex += hexValues[randomNum(hexValues.length)]
  }
  return hex
}

export default genHexCode
