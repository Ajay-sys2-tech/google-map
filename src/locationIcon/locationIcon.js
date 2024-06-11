export function icon(user) {
    let url ;
    if(user.photo === "" ) 
      user.photo = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D";
    const waterDroplet = document.createElement("div");
    waterDroplet.className = "water-droplet";
    const profilePic = document.createElement("div");
    profilePic.className = "profile-pic" ;
    
    console.log(user.fullName);
    const img = document.createElement("img");
    img.src = user.photo;
    img.alt = "User Picture";
    profilePic.appendChild(img);
    waterDroplet.appendChild(profilePic);
   
    
    return waterDroplet;
  };