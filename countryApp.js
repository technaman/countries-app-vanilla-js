const URL = "https://restcountries.eu/rest/v2/all";
let countries;

fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    countries = data;
    renderCountryList();
  });


const cardTemplate = `
    <div class="card-header">
         <img src="<%= flag %>" alt="" id="flag">
    </div>
    <div class="card-body">
        <p id="<%= name %>"><%= name %></p>
        <p id="<%= capital %>">
            <%= capital %>
        </p>
    </div>
`;

//const CountryModel = Backbone.Model.extend();

const CardView = Backbone.View.extend({    
    className: 'card col-sm-12 col-md-6 col-lg-4 col-xl-3',     
    template: _.template(cardTemplate),
    initialize: function() {
        //console.log('Card view initialized');
        this.render();
    },
    events: {
        'click': 'handleClick',
        //'mouseover' : 'mouseOverHandler',
        'click img' : 'imgClickHandler'
    },
    imgClickHandler: function(e) {
        e.stopPropagation();
        console.log('clicked on flag');
    },
    mouseOverHandler: function() {
        console.log('mouseover', this.model.name);
    },
    handleClick: function(){
        console.log('clicked', this.model.name);
    },
    getAllCountries: function(){

    },    
    processData: function(){

    },
    render: function() {
        //console.log('Card view rendered');
        this.getAllCountries();
        this.processData();
        //var data = this.model ? this.model.attributes : {};
        var dynamicHTML = this.template(this.model);

        this.$el.html(dynamicHTML);
    }
});


/* -------------------- */

function renderCountryList() {
  countries.forEach(function (country) {
    renderCountryCard(country);
  });


//   var back = document
//     .getElementById("back-to-list")
//     .addEventListener("click", togglePages);


  function renderCountryCard(country) {
    let cardView = new CardView({ model: country});    
    var html = cardView.el;
    $('#card-list').append(html);
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
  
  function togglePages() {
    document.getElementById("details").classList.toggle("hidden");
    document.getElementById("listPage").classList.toggle("hidden");
  }
}

