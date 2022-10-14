export const isAPIAllowed = (apiName) => {
  const userString = sessionStorage.getItem("userdetails");
  if(userString != null){
    const userObj = JSON.parse(userString);
    if(userObj != null && userObj.userPrivilegeList != null){
      return checkAPIExists(apiName,userObj.userPrivilegeList);
    }
  }else{
    console.log('userdetails not found in session storage');
  }
  return false;
};

function checkAPIExists(apiName,privelegesList){
  for (var i=0; i<privelegesList.length; i++) {
    if(apiName == privelegesList[i].apiID){
      return true;
    }
  }
  return false;
}


