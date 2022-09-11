import { pfget,pfpost,pfupdate,pfpatch,pfdelete} from "./pescofetch.js";
import get from "./getElement.js";
// URL use to get and post data
const URL = 'https://jsonplaceholder.typicode.com/posts';
// URL use to get,update,patch,delete a specifc data
const URL2= 'https://jsonplaceholder.typicode.com/posts/2';

const elementContent = get('.content');
// content used for post,update - gets the whole entity object and replaces it with new data
const content = {
  title: "Pesco Fetch",
  body: "Clark Joy made this library",
  userId: 3,
}
// content used for patch - only update the specific data in an object entity
const content2 = {
  title: "Pesco Fetch",
}

const btns = document.querySelectorAll('.tab-btn');
const articles = document.querySelectorAll('.inputs-content');
const elContent = get('.content');
const getForm = get('.get-form')
const postForm = get('.post-form')
const updateForm = get('.update-form')
const patchForm = get('.patch-form')
const deleteForm = get('.delete-form')
const display = get('.display')


elContent.addEventListener('click',function(e){

  const id = e.target.dataset.id;
  if(id){
    // remove active from other buttons
    btns.forEach(btn => {
      btn.classList.remove('active');
    });
    e.target.classList.add('active');
    // hide all articles
    articles.forEach(article =>{
      article.classList.remove('active');
    });
    const element = get(`#${id}`);
    element.classList.add('active');
  }

});



async function showData(url){
 const data = await pfget(url);
 console.log(data);
 displayData(data);
}
async function postData(url,post){
  const response = await pfpost(url,post);
  console.log(response);
   displayData(response);
 }
async function updateData(url,put){
  const response = await pfupdate(url,put);
   console.log(response);
   displayData(response);
 }
async function patchData(url,patch){
  const response = await pfpatch(url,patch);
   console.log(response);
   displayData(response);
 }
async function deleteData(url){
  const response = await pfdelete(url);
   console.log(response);
 }

 function displayData(data){
    const {id:checkId} = data;
    if(checkId){
      const {id,title,body } = data;
      display.innerHTML = `<p>${id}: <strong>${title}</strong> \n ${body}</p>`;

    } else {
      display.innerHTML = data.map(item =>{
      const {id,title,body } = item;
      return `<p>${id}: <strong>${title}</strong>  \n ${body} </p>`
      }).join('');
    }
 }

getForm.addEventListener('submit',function(e){
  e.preventDefault();
  const getFormInputURL = get('#getinputurl').value;
  showData(getFormInputURL);
  getForm.reset();
})
postForm.addEventListener('submit',function(e){
  e.preventDefault();
  const postFormInputURL = get('#postinputurl').value;
  const postFormInputTitle = get('#postinputtitle').value;
  const postFormInputBody = get('#postinputbody').value;
  const postDataContent = {
    title: postFormInputTitle,
    body: postFormInputBody
  }
  postData(postFormInputURL,postDataContent);
  postForm.reset();
})
updateForm.addEventListener('submit',function(e){
  e.preventDefault();
  const updateFormInputURL = get('#updateinputurl').value;
  const updateFormInputTitle = get('#updateinputtitle').value;
  const updateFormInputBody = get('#updateinputbody').value;
  const updateDataContent = {
    title: updateFormInputTitle,
    body: updateFormInputBody
  }
  updateData(updateFormInputURL,updateDataContent);
  updateForm.reset();
})
patchForm.addEventListener('submit',function(e){
  e.preventDefault();
  const patchFormInputURL = get('#patchinputurl').value;
  const patchFormInputBody = get('#patchinputbody').value;
  const patchDataContent = {
    body: patchFormInputBody
  }
  patchData(patchFormInputURL,patchDataContent);
  patchForm.reset();
})
deleteForm.addEventListener('submit',function(e){
  e.preventDefault();
  const deleteFormInputURL = get('#deleteinputurl').value;
  deleteData(deleteFormInputURL);
  deleteForm.reset();
})