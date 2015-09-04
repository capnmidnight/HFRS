if ( !HTMLFormElement.prototype.reportValidity ) {
  HTMLFormElement.prototype.reportValidity = function () {
    var elements = this.querySelectorAll( "input, textarea" ),
        areAllValid = true,
        firstInvalid = null;
    for ( var i = 0; i < elements.length; ++i ) {
      var elem = elements[i],
          isValid = true,
          pattern = elem.pattern;

      if ( !pattern ) {
        switch ( elem.type ) {
          case "email":
            pattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}";
        }
      }

      elem.style.backgroundColor = "";
      if ( elem.required && elem.value.length === 0 ) {
        isValid = false;
      }
      else if ( elem.value.length > 0 && pattern ) {
        var regex = new RegExp( "^" + pattern + "$" );
        isValid = regex.test( elem.value );
      }

      if ( !isValid ) {
        elem.style.backgroundColor = "#ffc0c0";
        if ( !firstInvalid ) {
          firstInvalid = elem;
        }
      }

      areAllValid = areAllValid && isValid;
    }

    if ( firstInvalid ) {
      firstInvalid.scrollIntoView();
    }
    return areAllValid;
  };
}

waitFor(
    function () {
      return document.forms.contactForm;
    },
    function () {
      function clearField () {
        this.value = this.value.trim();
      }
      Array.prototype.slice.call( document.forms.contactForm.querySelectorAll(
          "input, textarea" ) )
          .forEach( function ( elem ) {
            elem.addEventListener( "blur", clearField.bind( elem ), false );
          } );
    } );

function sendContact ( form, successMessage, errorMessage ) {
  if ( form.reportValidity() ) {
    var data = {
      name: form.contact_name.value,
      email: form.contact_email.value,
      phone: form.contact_phone.value,
      company: form.contact_company.value,
      description: form.contact_description.value,
      records: form.contact_records.value,
      message: form.contact_message.value,
      contacton1: ( form.contact_contacton_date1.value + " " +
          form.contact_contacton_time1.value ),
      contacton2: ( form.contact_contacton_date2.value + " " +
          form.contact_contacton_time2.value ),
      contacton3: ( form.contact_contacton_date3.value + " " +
          form.contact_contacton_time3.value ),
      starton: form.contact_starton.value
    };

    Object.keys( data )
        .forEach( function ( k ) {
          data[k] = data[k].trim();
          if ( data[k].length === 0 ) {
            data[k] = null;
          }
        } );

    send(
        "contacts",
        data,
        function ( msg ) {
          form.style.display = "none";
          successMessage.style.display = "block";
          successMessage.scrollIntoView();
          var b = document.querySelector( "#callbackName" );
          b.innerHTML = "";
          b.appendChild( document.createTextNode( data.name ) );
        },
        function ( msg ) {
          form.style.display = "none";
          errorMessage.style.display = "block";
          errorMessage.scrollIntoView();
        } );
  }
}

function makeURL ( protocol, domain, port, path, queryMap ) {

  if ( !protocol ) {
    protocol = "http:";
  }
  else if ( protocol[protocol.length - 1] !== ":" ) {
    protocol += ":";
  }

  if ( !domain ) {
    domain = "localhost";
  }
  else if ( domain[domain.length - 1] === "/" ) {
    domain = domain.substring( 0, domain.length - 1 );
  }

  var url = protocol + "//" + domain;

  if ( port && port !== 80 ) {
    url += ":" + port;
  }

  if ( path ) {
    if ( path[path.length - 1] === "/" ) {
      path = path.substring( 0, path.length - 1 );
    }
    url += "/" + path;
  }

  if ( queryMap ) {
    var output = [ ];
    for ( var key in queryMap ) {
      if ( queryMap.hasOwnProperty( key ) &&
          typeof queryMap[key] !== "function" ) {
        output.push( encodeURIComponent( key ) + "=" + encodeURIComponent(
            queryMap[key] ) );
      }
    }

    return url + "?" + output.join( "&" );
  }
  else {
    return url;
  }
}

function send ( path, data, success, fail, progress ) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.onerror = fail;
    xhr.onabort = fail;
    xhr.onprogress = progress;
    xhr.onload = function () {
      if ( xhr.status < 400 ) {
        if ( success ) {
          success( xhr.response );
        }
      }
      else if ( fail ) {
        fail( xhr.status );
      }
    };
    var url = makeURL(
        document.location.protocol,
        document.location.hostname,
        8083,
        path );
    xhr.open( "POST", url );
    xhr.responseType = "json";
    xhr.setRequestHeader( "Content-Type",
        "application/json;charset=UTF-8" );
    xhr.send( JSON.stringify( data ) );
  }
  catch ( exp ) {
    fail( exp );
  }
}