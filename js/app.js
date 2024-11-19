import Giphy from './giphy.js';

const image = document.querySelector('#resultTend');
const suggested = document.querySelector('.results');
const searchResult = document.querySelector('#searchResult');
const txtlookFor = document.querySelector('#txtlookFor');
const btnlookFor = document.querySelector('#btnlookFor');
const filterSuggestions = document.querySelector('#filter');
// const btnfilter = document.querySelector('#btnfilter');
// const filterButton = document.getElementsByClassName('filter_lookFor');
const Contentstart = document.querySelector('#start');
const ContentmyGuifos = document.querySelector('#myGuifo');
// const ContentCapture = document.querySelector('#capture');
const guifos = document.getElementById('guifos');
const guifosStorage = document.getElementById('guifosStorage');
const cardSearch = document.getElementById('cardSearch');
const contentTheme = document.getElementById('contentTheme');
const btnChangeTopic = document.getElementById('btnChangeTopic');
// const btnCreateGuifos = document.getElementById('btnCreateGuifos');
const anchorGuifos = document.getElementById('guifos');
let LocalStorage = localStorage.getItem('currentTopic');
let arraySearches = [];
var flag = false;

(() => {
  txtlookFor.value = '';
  ShowDB();
})();

//Create guifos, upload.html
// btnCreateGuifos.addEventListener('click', function () {
//   window.location.href = './upload.html';
// });

document.getElementById('logo').addEventListener('click', function () {
  Contentstart.style.display = 'block';
  ContentmyGuifos.style.display = 'none';
});

//Load from local storage
document.addEventListener('DOMContentLoaded', function (e) {
  let LocalStorage = localStorage.getItem('currentTopic');
  if (LocalStorage == 'dia') {
    document.getElementById('styles').href = './css/style.css';
    if (e.target.id == 'btnTopic1') {
      e.target.style.background = 'red';
    }
  } else {
    document.getElementById('styles').href = './css/style2.css';
  }
});

//Theme changer
// contentTheme.addEventListener('click', function (e) {
//   e.preventDefault();
//   const chosenTopic = e.target.id;
//   switch (chosenTopic) {
//     case 'btnTopic1':
//       document.getElementById('styles').href = './css/style.css';
//       localStorage.setItem('currentTopic', 'dia');
//       contentTheme.style.visibility = 'hidden';
//       styleCurrentTopic();
//       break;
//     case 'btntopics2':
//       document.getElementById('styles').href = './css/style2.css';
//       localStorage.setItem('currentTopic', 'noche');
//       contentTheme.style.visibility = 'hidden';
//       styleCurrentTopic();
//       break;
//   }
// });

//Shift button panel
// btnChangeTopic.addEventListener('click', function () {
//   contentTheme.innerHTML = ``;
//   var newBtn = document.createElement('button');
//   newBtn.className = 'btnTopic1';
//   newBtn.id = 'btnTopic1';
//   newBtn.innerHTML = `Sailor Day`;
//   contentTheme.appendChild(newBtn);
//   var newBtn2 = document.createElement('button');
//   newBtn2.className = 'btntopics2';
//   newBtn2.id = 'btntopics2';
//   newBtn2.innerHTML = `Sailor Night`;
//   contentTheme.appendChild(newBtn2);
//   contentTheme.style.visibility = 'visible';
//   styleCurrentTopic();
// });

function styleCurrentTopic() {
  LocalStorage = localStorage.getItem('currentTopic');
  let topic1 = document.getElementById('btnTopic1');
  let topics2 = document.getElementById('btntopics2');
  if (LocalStorage == 'dia') {
    topic1.style.background = '#FFF4FD';
    topic1.style.color = '#110038';
    topic1.style.border = '1px solid #CCA6C9';
    topic1.style.boxShadow =
      'inset -1px -1px 0 0 #E6DCE4, inset 1px 1px 0 0 #FFFFFF';
  } else {
    topics2.style.background = '#2E32FB';
    topics2.style.color = '#FFFFFF';
    topic1.style.border = '1px solid rgba(51,53,143,0.20)';
    topic1.style.boxShadow =
      'inset -1px -1px 0 0 #E6DCE4, inset 1px 1px 0 0 #FFFFFF';
  }
}

//Hidden div
// document.body.onclick = function (e) {
//   var target = e.target || e.srcElement;
//   var state = contentTheme.style.visibility;
//   if (
//     e.target.id == 'btnChangeTopic' ||
//     e.target.classList[1] == 'fa-caret-down'
//   ) {
//     if (flag == true) {
//       contentTheme.style.visibility = 'hidden';
//       flag = false;
//     } else {
//       flag = true;
//     }
//   } else {
//     if (state == 'visible') {
//       do {
//         if (contentTheme == target) {
//           return;
//         }
//         target = target.parentNode;
//       } while (target);
//       contentTheme.style.visibility = 'hidden';
//     }
//   }

//   //Text color
//   if (e.target.id == 'guifos') {
//     anchorGuifos.style.color = '#8A829D';
//   } else {
//     if (LocalStorage == 'dia') {
//       anchorGuifos.style.color = '#110038';
//     } else {
//       anchorGuifos.style.color = '#fff';
//     }
//   }
// };

//Search
btnlookFor.addEventListener('click', function () {
  var valueTxt = txtlookFor.value.toString();
  CreateItem(valueTxt);
  SaveDB();
  const resSearch = new Giphy(valueTxt);
  resSearch.getSearchResults().then((result) => {
    searchResult.innerHTML = ``;
    for (let i of result.data) {
      searchResult.innerHTML += `
            <div class="img-trend">
                <img src="${i.images.fixed_height.url}" alt="">
                <label id="lblImg">#${i.title}</label>
            </div>
            `;
    }
    document.getElementById('txtSearch').style.display = 'block';
  });
  hideDiv();
});

//Button Filter:Sample
txtlookFor.addEventListener('keyup', function () {
  filterSuggestions.style.visibility = 'visible';
  btnlookFor.disabled = false;
  btnlookFor.style.border = '1px solid #110038';
  var valueTxt = txtlookFor.value.toString();
  const resSearch = new Giphy(valueTxt);
  resSearch.getSearchResults().then((result) => {
    filterSuggestions.innerHTML = ``;
    let j = 0;
    for (let i of result.data) {
      j++;
      filterSuggestions.innerHTML += `
<button id="btnfilter" name="btnfilter">${i.title}</button>
       `;
      if (j > 2) {
        break;
      }
    }
  });
});

// don't know what it does, neither it does anything
//extra function
// document.onkeypress = function (e) {
//   var isIE = document.all;
//   var isNS = document.layers;
//   var key = isIE ? event.keyCode : e.which;
//   if (key == 13) {
//     btnlookFor.click();
//     txtlookFor.value = '';
//   }
// };

//Div click function
document.onclick = function (e) {
  var target = e.target || e.srcElement;
  var state = filterSuggestions.style.visibility;
  if (state == 'visible') {
    do {
      if (filterSuggestions == target) {
        return;
      }
      target = target.parentNode;
      // console.log(target.parentNode);
    } while (target);
    filterSuggestions.style.visibility = 'hidden';
    btnlookFor.disabled = true;
    btnlookFor.style.border = '1px solid #808080';
  }
};

//Improved search process
filterSuggestions.addEventListener('click', function (e) {
  if (e.target.localName == 'button') {
    e.preventDefault();
    txtlookFor.value = e.target.innerHTML;
    btnlookFor.click();
    hideDiv();
  }
});

//Hide search div
function hideDiv() {
  filterSuggestions.style.visibility = 'hidden';
}

//Suggested
suggested.addEventListener('click', function (e) {
  if (e.target.localName == 'button') {
    btnlookFor.disabled = false;
    e.preventDefault();
    txtlookFor.value = e.target.name;
    btnlookFor.click();
    hideDiv();
    window.location.href = '#txtSearch';
  }
});

//My Gifs
// guifos.addEventListener('click', function () {
//   document.getElementById('txtGuifosIndex').style.display = 'block';
//   Contentstart.style.display = 'none';
//   ContentmyGuifos.style.display = 'block';
//   guifosStorage.innerHTML = ``;
//   for (let i = 0; i <= localStorage.length - 1; i++) {
//     if (localStorage.key(i).indexOf('gif') >= 0) {
//       let clue = localStorage.key(i);
//       let objGuifos = JSON.parse(localStorage.getItem(clue));
//       guifosStorage.innerHTML += `
//               <div class="img-trend">
//                   <img src="${objGuifos.data.images.fixed_height.url}" alt="">
//                   <label id="lblImg">#${objGuifos.data.title}</label>
//               </div>
//               `;
//     }
//   }
// });

//Store and display in local storage
const CreateItem = (arg) => {
  let item = {
    value: arg,
  };
  arraySearches.push(item);
  return item;
};
const SaveDB = () => {
  localStorage.setItem('search', JSON.stringify(arraySearches));
  ShowDB();
};

function ShowDB() {
  cardSearch.innerHTML = ``;
  arraySearches = JSON.parse(localStorage.getItem('search'));

  if (arraySearches === null) {
    arraySearches = [];
  } else {
    arraySearches.forEach((index) => {
      var newDiv = document.createElement('div');
      newDiv.className = 'resSearchStorage';
      newDiv.innerHTML = `#${index.value}`;
      cardSearch.appendChild(newDiv);
    });
  }
}

//Click search
document.body.addEventListener('click', function (event) {
  if (event.target.className == 'resSearchStorage') {
    let search = event.target.innerHTML.substr(1);
    txtlookFor.value = search;
    const resSearch = new Giphy(search);
    resSearch.getSearchResults().then((result) => {
      searchResult.innerHTML = ``;
      for (let i of result.data) {
        searchResult.innerHTML += `
                <div class="img-trend">
                    <img src="${i.images.fixed_height.url}" alt="">
                    <label id="lblImg">#${i.title}</label>
                </div>
                `;
      }
      document.getElementById('txtSearch').style.display = 'block';
    });
    hideDiv();
  }
});

//Suggestions
const suggestions = new Giphy();
suggestions.getSuggestions().then((result) => {
  suggested.innerHTML = ``;

  for (let i of result.data) {
    suggested.innerHTML += `
    <div class="content_results">
        <div class="qualification">
            <label>#${i.title}</label>
        </div>
        <div class="img-result ">
            <img src="${i.images.fixed_height.url}" alt="">
        </div>
    </div>
    `;
  }
});
//             <button name="${i.title}" id="seeMore">See More...</button>
//             <button><img src="./img/button3.svg" alt=""></button>

//trends
const tendencia = new Giphy();
tendencia.getTrending().then((result) => {
  image.innerHTML = ``;
  for (let i of result.data) {
    image.innerHTML += `
    <div class="img-trend">
        <img src="${i.images.fixed_height.url}" alt="">
        <label id="lblImg">#${i.title}</label>
    </div>
    `;
  }
});
