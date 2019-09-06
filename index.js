const baseURL = 'https://api.github.com';
const user = 'lasttruth';

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return '';
}

function forkRepo() {
  const repo = 'learn-co-curriculum/js-ajax-fetch-lab';

  fetch(`${baseURL}/repos/${repo}/forks`, {
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
    .then(res => res.json())
    .then(json => showResults(json));
}

function showResults(json) {
  //use this function to display the results from forking via the API
  const forkedRepo = `<p><h2><strong id="repo-name">${json.name}</strong></h2><h3 id="owner-name">${json.owner.login}</h3></p>` + `<p><a href="${json.html_url}">Your Fork</a>`;
  document.getElementById('results').innerHTML = forkedRepo;
}

function createIssue(el) {
  //use this function to create an issue based on the values input in index.html
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const postData = {title: title, body: body}
  fetch(`${baseURL}/repos/${user}/${repName}/issues`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(res => getIssues());
}

function getIssues() {
  fetch(`${baseURL}/repos/${user}/${repName}/issues`, {
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(res => res.json())
  .then(
    json => (document.getElementById('issues').innerHTML = `<ul>${json
    .map(
      j =>
      '<li><h3>' +
      j.title +
      '</h3><p>' +
      j.body +
      '</p>'
    )
    .join('')}</ul>`
  ));
}