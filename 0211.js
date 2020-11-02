const URL = "https://restcountries.eu/rest/v2/all";

const CountryCollection = Backbone.Collection.extend({
  initialize: function () {
    console.log("initialized");
  },
});

const countries = new CountryCollection();

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    countries.reset(data);
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

const ListView = Backbone.View.extend({
  el: "#card-list",
  initialize: function () {
    this.render();
    let self = this;  
    this.collection.on('change', function() {        
        console.log('collection has changed');
    })  
    this.collection.on("reset", function () {
      console.log("collection reset");
      // this is always dependent on the enclosing scope -- execution context
      self.render();
    });
  },
  render: function () {
    let self = this;
    this.$el.empty();
    this.collection.forEach(function (model) {       
      let cardView = new CardView({ model: model });
      self.$el.append(cardView.render().$el);
    });
  },
});

const CardView = Backbone.View.extend({
    initialize: function() {
        let self = this;
        this.model.on('change', function(){
            console.log('Model has changed');
            self.render();            
        });
    },
  template: _.template(cardTemplate),
  className: "card col-xl-2 col-lg-3 col-sm-6",
  render: function () {
    let data = this.model.toJSON();
    this.$el.html(this.template(data));
    return this;
  },
});

const listView = new ListView({ collection: countries });
