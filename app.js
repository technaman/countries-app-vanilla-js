"use strict";

const URL = "https://restcountries.eu/rest/v2/all";
let countries;

fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    countries = data;
    renderCountryList();
  });

// list all the countries details

function renderCountryList() {
  countries.forEach(function (country) {
    renderCountryCard(country);
  });
  var back = document
    .getElementById("back-to-list")
    .addEventListener("click", togglePages);

  function htmlToElement(html) {
    var template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  }

  function renderCountryCard(country) {
    const { name, capital, flag } = country;
    let card = htmlToElement(renderCard());

    //let card = $(renderCard())[0];
    document.getElementById("card-list").append(card);

    card.querySelector("#name").innerText = name;
    card.querySelector("#flag").src = flag;
    card.querySelector("#capital").innerText = capital;

    card.addEventListener("click", function (e) {
      var countryName = e.currentTarget.querySelector("#name").innerText;
      var countryObj = findCountryObject(countryName);
      if (countryObj) {
        renderCountryPage(countryObj);
      }
    });
  }

  function findCountryObject(countryName) {
    return countries.filter((country) => {
      return country.name == countryName;
    })[0];
  }

  function renderCountryPage(countryObj) {
    const detailSection = document.getElementById("details");
    detailSection.querySelector("#name").innerText = countryObj.name;
    detailSection.querySelector("#flag").src = countryObj.flag;
    detailSection.querySelector("#capital").innerText = countryObj.capital;

    togglePages();
  }

  function renderCard() {
    return `
      <div class="card col-sm-12 col-md-6 col-lg-4 col-xl-3">
      <div class="card-header">
        <h2 id="name"></h2>
      </div>
      <div class="card-body">
        <img src="" alt="Country Flag" id="flag">
        <p id="capital"></p>
      </div>
      <div class="card-footer">            
      </div>
    </div>  
      `;
  }
  
  function togglePages() {
    document.getElementById("details").classList.toggle("hidden");
    document.getElementById("listPage").classList.toggle("hidden");
  }
}
