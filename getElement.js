const getElement = (selector) =>{
  const element = document.querySelector(selector);
  if(element) return element;
  throw new Error(`ERROR: Cannot find ${selector}.`);
}
export default getElement;