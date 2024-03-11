const account_id = localStorage.getItem('account_id');

function changeHeading(text) {
  const heading = document.querySelector('h1.text-center.py-4');
  heading.textContent = text;
}

async function get_all_book() {
    const response = await axios.get('http://127.0.0.1:8000/get_all_book');
    console.log(response.data);
    const book_list = response.data.book_list;
    console.log(book_list);
    displayBookList(book_list);
}

function page_search_by_name() {
  const input = document.getElementById("search_by_name").value;
  window.location.href = `index.html?search=${input}`;
}

async function search_by_name(event) {
  event.preventDefault();

  const input = document.getElementById("search_by_name").value;
  const content = document.getElementById("content");

  const response = await axios.get(
    `http://127.0.0.1:8000/search_book_by_name?name=${input}`
    
  );

  console.log(response.data);

  const heading = document.querySelector('h1.text-center.py-4');
  heading.textContent = `Search : ${input}`;

  const book_list = response.data.book_list;
  console.log(book_list);
  displayBookList(book_list);
}

async function search_by_name_2(input) {
  const content = document.getElementById("content");
  const response = await axios.get(
      `http://127.0.0.1:8000/search_book_by_name?name=${input}`
  );

  const heading = document.querySelector('h1.text-center.py-4');
  heading.textContent = `Search : ${input}`;


  const book_list = response.data.book_list;
  displayBookList(book_list);
}

document.getElementById("searchButton").addEventListener("click", search_by_name);

function displayBookList(bookList) {

  const content = document.getElementById("content");
  content.innerHTML = '';

  const divRow = document.createElement('div');
  divRow.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4', 'col-md-10', 'm-auto');

  bookList.forEach(book => {
    const divCol = document.createElement('div');
    divCol.classList.add('col');

    const divCard = document.createElement('div');
    divCard.classList.add('card');

    const a = document.createElement('a');
    a.href = `book_info.html?id=${book.id}`;

    const img = document.createElement('img');
    img.src = `images/${book.book_name}.jpg`;
    img.classList.add('card-img-top');
    img.alt = 'Book Cover';

    const divCardBody = document.createElement('div');
    divCardBody.classList.add('card-body');

    const h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.textContent = book.book_name;

    const pWriter = document.createElement('p');
    pWriter.classList.add('card-text');
    pWriter.textContent = `Writer: ${book.writer_name}`;
    pWriter.style.cursor = 'pointer';
    pWriter.addEventListener('click', function() {
    const writerBookCollectionUrl = `writer_book_collection.html?writer=${book.writer_name}`;
    window.location.href = writerBookCollectionUrl;
    });

    const pRating = document.createElement('p');
    pRating.classList.add('card-text');
    pRating.textContent = `Rating: ${book.rating}`;

    const aPrice = document.createElement('a');
    aPrice.href = '#';
    aPrice.classList.add('btn', 'btn-info');
    aPrice.dataset.bsToggle = 'tooltip';
    aPrice.dataset.bsPlacement = 'right';
    aPrice.title = 'Price';
    aPrice.style.backgroundColor = '#ff6347';
    aPrice.style.borderColor = '#ff6347';
    aPrice.textContent = `Price: ${book.price} coin`;

    a.appendChild(img)
    divCardBody.appendChild(h5);
    divCardBody.appendChild(pWriter);
    divCardBody.appendChild(pRating);
    divCardBody.appendChild(aPrice);
    divCard.appendChild(a);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);

    divRow.appendChild(divCol);
  });

  content.appendChild(divRow);
}


async function get_book_info(id) {
  const response = await axios.get(
    `http://127.0.0.1:8000/book_info?id=${id}`
    );
  console.log(response.data);

  const bookInfo = response.data["Book's info"];
  displayBookInfo(bookInfo);
}

function displayBookInfo(bookInfo) {
  const bookInfoDiv = document.getElementById('bookInfo');
  bookInfoDiv.innerHTML = `
    <h1>${bookInfo.book_name}</h1>
    <p>Writer: <a href="#" id="writerLink">${bookInfo.writer_name}</a></p>
    <p>Type: ${bookInfo.type_book}</p>
    <p>Introduction: ${bookInfo.intro}</p>
    <p>Rating: ${bookInfo.rating}</p>
    <p>Price: ${bookInfo.price} coin</p>
  `;

  const bookCover = document.getElementById('bookCover');
  bookCover.src = `images/${bookInfo.book_name}.jpg`;
  bookCover.alt = bookInfo.book_name;
  const writerLink = document.getElementById('writerLink');
  writerLink.addEventListener('click', () => {
    const writerBookCollectionUrl = `writer_book_collection.html?writer=${bookInfo.writer_name}`;
    window.location.href = writerBookCollectionUrl;
  });
}


function toggleStar(star) {
  star.classList.toggle("checked");
}

function submitFormAndAddStar() {
  add_rating();
  submitForm();
}

function submitForm() {
  const queryParams = new URLSearchParams(window.location.search);
  const bookId = queryParams.get('id');
  const link = `book_info.html?id=${bookId}`;
  window.location.href = link;
}

async function add_rating() {
  const stars = document.querySelectorAll(".fa-star.checked").length;
  console.log(stars);
  const queryParams = new URLSearchParams(window.location.search);
  const Id = queryParams.get('id');

  console.log("id", Id)
  console.log("stars", stars)

  const response = await axios.post(
    `http://127.0.0.1:8000/rating?book_id=${Id}&rating=${stars}`
  );
}

async function get_promotion() {
  const response = await axios.get('http://127.0.0.1:8000/show_promotion');
  const promotion = response.data.Promotion;
  console.log(promotion)
  
  const heading = document.querySelector('h1.text-center.py-4');
  heading.textContent = promotion;

  book_in_promotion(promotion)
}

async function book_in_promotion(promotion) {

  const response = await axios.get(
    `http://127.0.0.1:8000/book_from_promotion?promotion=${promotion}`
  );

  console.log(response.data);

  const book_list = response.data["Book in this promotion"];
  console.log(book_list);
  displayBookList(book_list);
}

async function get_promotion_page() {
  window.location.href = 'index.html?promotion=true';
}

async function add_comment(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('id');
  const input = document.getElementById("comment").value;

  const response = await axios.post(
    `http://127.0.0.1:8000/comment?Reader_id=${account_id}&Book_id=${bookId}&comment=${input}`
  );

  console.log(response.data);
}

async function add_comment(event) {
  if (event) {
    event.preventDefault();
  }

  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('id');
  const input = document.getElementById("comment").value;

  const response = await axios.post(
    `http://127.0.0.1:8000/comment?Reader_id=${account_id}&Book_id=${bookId}&comment=${input}`
  );

  console.log(response.data);
  show_comment();
}

async function show_comment() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('id');

  const response = await axios.get(
    `http://127.0.0.1:8000/view_comment_of_book?Book_id=${bookId}`
  );

  const commentList = response.data["Comment's list"];
  displayComment(commentList);
}

function displayComment(commentList) {
  const commentListDiv = document.getElementById('commentList');
  commentListDiv.innerHTML = '';

  commentList.forEach(comment => {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('commentDiv');
    
    const accountDiv = document.createElement('div');
    accountDiv.classList.add('accountDiv');
    
    const datetimeDiv = document.createElement('div');
    datetimeDiv.classList.add('datetimeDiv');

    const commentPara = document.createElement('p');
    commentPara.textContent = `${comment.comment}`;
    commentDiv.appendChild(commentPara);

    const accountPara = document.createElement('p');
    accountPara.textContent = `${comment.account}`;
    accountDiv.appendChild(accountPara);

    const datetimePara = document.createElement('p');
    datetimePara.textContent = `${comment.datetime}`;
    datetimeDiv.appendChild(datetimePara);

    commentListDiv.appendChild(commentDiv);
    commentListDiv.appendChild(accountDiv);
    commentListDiv.appendChild(datetimeDiv);
  });
}

async function add_complain(event) {
  if (event) {
    event.preventDefault();
  }

  const input = document.getElementById("complain").value;

  const response = await axios.post(
    `http://127.0.0.1:8000/submit_complaint?user_id=${account_id}&message=${input}`
  );

  console.log(response.data);
}

async function show_complain() {
  const response = await axios.get(
    `http://127.0.0.1:8000/view_complaints`
  );

  const complainList = response.data["Complain"];
  displayComplain(complainList);
}

function displayComplain(complainList) {
  const complainContainer = document.getElementById('complainList');
  complainContainer.innerHTML = '';

  complainList.forEach(complain => {
    const complainDiv = document.createElement('div');

    const accountPara = document.createElement('p');
    accountPara.textContent = `${complain.account} : ${complain.message} on ${complain.datetime}`;
    complainDiv.appendChild(accountPara);

    complainContainer.appendChild(complainDiv);
  });
}

async function writer_book_collection() {
  const queryParams = new URLSearchParams(window.location.search);
  const writer = queryParams.get('writer');

  const heading = document.querySelector('h1.text-center.py-4');
  heading.textContent = `${writer} Collection`;

  const content = document.getElementById("content");
  const response = await axios.get(
      `http://127.0.0.1:8000/show_book_collection_of_writer?writer_name=${writer}`
  );

  const book_list = response.data["Book's list"];
  displayBookList(book_list);
}

async function reader_book_collection() {

  const heading = document.querySelector('h1.text-center.py-4');
  heading.textContent = `My Collection`;

  const content = document.getElementById("content");
  const response = await axios.get(
      `http://127.0.0.1:8000/show_book_collection_of_reader?Reader_id=${account_id}`
  );

  const book_list = response.data["Book's list"];
  displayBookList(book_list);
}

