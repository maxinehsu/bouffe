function my_function(city_number){

  var request = new XMLHttpRequest();

  request.open("GET", "https://developers.zomato.com/api/v2.1/search?entity_id="+city_number+"&entity_type=city&cuisines=143", true);
  request.setRequestHeader('user-key','7ddaef512f6d3c427138b1b65ca989ed');

  request.onload = function() {

    var data = JSON.parse(this.response);
    // document.getElementById('city').innerHTML = "Healthy restaurants: <br>";
    document.getElementById('city').innerHTML = "Nearby restaurants: <br>";
    console.log(data);
    var element = document.getElementById("city_results");
    element.innerHTML = "";

    for (i=0; i<(data['restaurants']).length; i++){

      var paragraph = document.createElement("div");
      var title = document.createElement('h1');
      title.innerHTML = data["restaurants"][i]['restaurant']['name'];
      var a = document.createElement('a');
      a.setAttribute('href', data['restaurants'][i]['restaurant']['url']);
      a.setAttribute('target', '_blank');
      a.innerHTML = data['restaurants'][i]['restaurant']['name'] + ' Zomato Review';
      var node = document.createElement('p');
      node.innerHTML = data['restaurants'][i]['restaurant']['location']['address'];
      // +'<br>'+data['restaurants'][i]['restaurant']['cuisines']+'<br>'+'price range (out of five): '+data['restaurants'][i]['restaurant']['price_range'];
      paragraph.appendChild(title);
      paragraph.appendChild(a);
      paragraph.appendChild(node);

      var element = document.getElementById('city');
      element.appendChild(paragraph);
    }
  }
request.send();
}

function first_function() {

  var location_request = new XMLHttpRequest();
  var city_input = document.getElementById('userInput').value;

  location_request.open('GET', 'https://developers.zomato.com/api/v2.1/cities?q='+ city_input, true);
  // alert("this is a test hahahahahahah");
  location_request.setRequestHeader('user-key', '7ddaef512f6d3c427138b1b65ca989ed');
  location_request.onload = function() {
    var location_data = JSON.parse(this.response);
    var element = document.getElementById("city_results");

    var title = document.createElement('h1');
    title.innerHTML = "Choose your city";
    element.appendChild(title);

    console.log(location_data);

    for (i=0; i<(location_data['location_suggestions']).length; i++){
      var location_name = location_data['location_suggestions'][i]['name'];
      var location_id = location_data['location_suggestions'][i]['id'];
      console.log(location_name);
      console.log(location_id);
      var node = document.createElement('button');
      node.setAttribute('onclick', 'my_function('+location_id+')');
      node.innerHTML = location_name;
      element.appendChild(node);
      element.innerHTML += '<br>';
  }
}
location_request.send();
}

// Get the input field
var input = document.getElementById("myInput");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("myBtn").click();
  }
});
