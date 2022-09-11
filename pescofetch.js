function handleError(error){
  console.log(`ERROR: ${error}`);
}

const fetchData = async(url) =>{
  try {
    const response = await fetch(url);
    if(response.status >= 200 && response.status <= 299){
      const data = await response.json();
      return data;
    } else {
      console.log(response.status,response.statusText);
    }

  } catch (error) {
    console.log(error);
  }

}
const postData = async(url,post) =>{
  try {
    const response = await fetch(url,{
      method: "POST",
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify(post)
    });

 if(response.status >= 200 && response.status <= 299){
      const data = await response.json();
      return data;
    } else {
      console.log(response.status,response.statusText);
    }
  } catch (error) {
    console.log(error);
  }

}
const putData = async(url,put) =>{
  const response = await fetch(url,{
    method: "PUT",
    headers: {"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(put)
  });
  const data = await response.json();
  return data;
}

const patchData = async(url,patch) =>{
  const response = await fetch(url,{
    method: "PATCH",
    headers: {"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(patch)
  });
  const data = await response.json();
  return data;
}
const deleteData = async(url) =>{
  const response = await fetch(url,{method: "DELETE"});
  const data = await response.json();
  console.log('Data DELETED succesfully!');
  return data;
}

export const pfget = async(url) =>{
   return fetchData(url).catch(handleError);
}
export const pfpost = async(url,data) =>{
   return postData(url,data).catch(handleError);
}
export const pfupdate = async(url,data) =>{
   return putData(url,data).catch(handleError);
}
export const pfpatch = async(url,data) =>{
   return patchData(url,data).catch(handleError);
}
export const pfdelete = async(url) =>{
   return deleteData(url).catch(handleError);
}
