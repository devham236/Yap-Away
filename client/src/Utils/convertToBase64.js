const convertToBase64 = async (file) => {
  const base64String = await new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => resolve(fileReader.result)
    fileReader.onerror = (error) => reject(error)
  })
  return base64String
}

export default convertToBase64
