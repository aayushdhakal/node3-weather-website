const url = 'http://puzzle.mead.io/puzzle';

   const weatherForm = document.querySelector('form');
   const search = document.querySelector('input');
   const messageOne = document.querySelector('#message-1');
   const messageTwo = document.querySelector('#message-2');

   weatherForm.addEventListener('submit',(e)=>{
      const location = search.value;
      messageOne.textContent = 'Loading...';
      messageTwo.textContent = '';
      const url2 = 'http://localhost:3000/weather?address='+location;

      fetch(url2)
         .then(response => response.json())
         .then(data=>{
               if(data.error){
                  messageOne.textContent = 'Error'
                  messageTwo.textContent = data.error;
               }else{
                  messageOne.textContent = data.location;
                  messageTwo.textContent = data.forecast;
               }
         });

      e.preventDefault();
   });