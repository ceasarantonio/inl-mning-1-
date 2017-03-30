window.onload = function () {
  let btnApi = document.getElementById('apibtn');
  let addBook = document.getElementById('addBook');
  let findBooks = document.getElementById('findBooks');
  let output = document.getElementById('outp');
  let addBook2 = document.getElementById('addBook2');
  let output2 = document.getElementById('outp2');
  let inptTitle = document.getElementById('inptTitle');
  let inptAuthor = document.getElementById('inptAuthor');
  let list = document.getElementById('list');
  let globalKey = 'KSCk6';
  let test = document.getElementById('test');

  btnApi.addEventListener('click', function (event) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function (event) {
      if (req.readyState == 4 && req.status == 200) {

        let data = JSON.parse(req.responseText);
        console.log(data);
        output.innerHTML = data.key;
        globalKey = data.key;
        console.log('This is the ' + globalKey);
        addBook2.addEventListener('click', f); //addbook2 click
      }

    };
    req.open('GET', 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey');
    req.send();

  });

  let f = function (event) {

    let req = new XMLHttpRequest();
    req.onreadystatechange = function (event) {
      if (req.readyState === 4 && req.status === 200) {
        let data = JSON.parse(req.responseText);
        output2.innerHTML = 'Success';

        //data = JSON.parse(req.responseText);
        if (data.status == 'error') {
          output2.innerHTML = `${data.message} Prova igen`;
          console.log(data);
        }
        // här finns data
      }
    }; //onreadystate
    let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=' + globalKey + `&title=${inptTitle.value}&author=${inptAuthor.value}`;
    console.log(url);
    req.open('GET', //'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&output.innerHTML&inptTitel.innerHTML&inptAuthor.innerHTML');
      url);
    req.send();
  }

  findBooks.addEventListener('click', function (event) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function (event) {
      if (req.readyState === 4 && req.status === 200) {
        let api = JSON.parse(req.responseText);
        console.log(api);
        if (api.status === 'error') {
          output2.innerHTML = `${api.message}  Prova igen`;
        } else if (api.status === 'success') {
          output2.innerHTML = `Success`;
          list.innerHTML = '';
          for (let i = 0; i < api.data.length; i++) {

            let listitem = document.createElement('li');
            listitem.innerHTML = `Author: ${api.data[i].author} Title: ${api.data[i].title}`;
            list.appendChild(listitem);
          };

        }

      }
    }
    req.open('GET', `https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=${globalKey}`);
    req.send();

  })









}
