function checkifchecked(ischecked) {
  let check;

  if ( event.target.elements.is_correct.checked === true ) {
    check = 1;
  } else {
    check = 0;
  }
  return check;
}

console.log(checkifchecked(req.body));