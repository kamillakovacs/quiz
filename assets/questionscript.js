'use strict';

window.onload = () => {
  const mainDiv = document.querySelector('.manage')
  const urlManage = "http://localhost:3000/questioning";
  const urlCreate = "http://localhost:3000/questions";
  const form = document.querySelector('form');

  fetch(urlManage)
    .then( res => res.json())
    .then( resp => {
      resp.result.forEach(elem => {
        let newDiv = document.createElement('div');
        let titleDiv = document.createElement('div');
        let thisP = document.createElement('p');
        mainDiv.appendChild(newDiv);
        newDiv.appendChild(titleDiv)
        titleDiv.appendChild(thisP);
        newDiv.classList.add('new-div');
        titleDiv.classList.add('new-title');
        thisP.innerHTML = elem.question;
        let deleteDiv = document.createElement('div');
        newDiv.appendChild(deleteDiv);
        deleteDiv.textContent = "Delete";
      }) 
    })
  }






