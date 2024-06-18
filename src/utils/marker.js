
export const createMarker = (user) => {
    const wrapper = document.createElement("div");
    wrapper.className = "marker-wrapper";

    const el = document.createElement("div");
    el.className = "custom-marker";
  
    let imageDiv = document.createElement("div");
    let contentDiv = document.createElement("div");
    imageDiv.className = "imageDiv";
    contentDiv.className = "contentDiv";
  
    let image = document.createElement("img");
    if(user.photo === '') user.photo = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D";
    image.src = user.photo;
    image.alt = 'user';
    imageDiv.appendChild(image);
  
    let nameParagraph = document.createElement("p");
    let designationParagraph = document.createElement("p");
    let cityParagraph = document.createElement("p");
  
    nameParagraph.className = "marker-para";
    designationParagraph.className = "marker-para";
    cityParagraph.className = "marker-para";
  
    // Set text content for each paragraph
    nameParagraph.textContent = user.fullName;
    designationParagraph.textContent = user.designation;
    cityParagraph.textContent = `${user.location.city}, ${user.location.country}`;
  
    // Append paragraphs to the div
    contentDiv.appendChild(nameParagraph);
    contentDiv.appendChild(designationParagraph);
    contentDiv.appendChild(cityParagraph);
  
    el.appendChild(imageDiv);
    el.appendChild(contentDiv);

    const triangle = document.createElement("div");
    triangle.className = "triangle"; 
  
    wrapper.appendChild(el);
    wrapper.appendChild(triangle);
    return wrapper;
  }