

function check_author_checker(){
  // para el checkbox de "Soy el autor"
 if ( $('.author_myself').is(':checked') ) {
   $('.author-field').slideUp('slow');
   $('.author-field input').removeAttr('required');
 } else { 
   $('.author-field').slideDown('slow');
   $('.author-field input').attr('required', 'required');
 }
}



$(function(){

  // date and time picker for Fecha
  $.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '&#x3c;Ant',
    nextText: 'Sig&#x3e;',
    currentText: 'Hoy',
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
    'Jul','Ago','Sep','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
    dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
    dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
  };

  $.datepicker.setDefaults($.datepicker.regional['es']);

  $.timepicker.regional['es'] = {
    timeOnlyTitle: 'Tiempo',
    timeText: 'Tiempo',
    hourText: 'Hora',
    minuteText: 'Minuto',
    secondText: 'Segundo',
    millisecText: 'Milisegundo',
    currentText: 'Ahora',
    closeText: 'Hecho',
    ampm: false
  };

  $.timepicker.setDefaults($.timepicker.regional['es']);

  $('#text_happened_at, #image_happened_at, #audio_happened_at, #video_happened_at').datetimepicker({
    // la fecha por defecto, como no, es el 15-M 
    defaultDate: new Date(2011, 03, 15, 0, 0),
    numberOfMonths: 3,
    showButtonPanel: true,
    dateFormat: 'dd-mm-yy',
    timeFormat: 'hh:mm',
    hourGrid: 2,
    minuteGrid: 5 
  });

  // autocomplete for tags
  $('#text_tag_list, #video_tag_list, #image_tag_list, #audio_tag_list, #node_tags').tagit({ 
    tagSource: "/tags/search.json",
    removeConfirmation: true,
    allowSpaces: true
  });


  if ( $('#wmd-input').length > 0 ) {
    // edicion de markdown para por ejemplo /texts/new

    // Esto es un fix para el bootstrap_form_for, que solo deja ponerlo abajo;
    // mola mas que este entre el label y el textarea, asi que lo movemos...
    var $button_bar = $('#wmd-button-bar');
    $button_bar.parent().prepend('<div id="wmd-button-bar"></div>');
    $button_bar.remove();
    
    // esto ya es del Markdown en si, usamos la libreria PageDown
    var converter = Markdown.getSanitizingConverter();
    var editor = new Markdown.Editor(converter);
    editor.run();
  } 

  $(".show_markdown_help").click( function(event){
    // esto es bastante tonto: muestra o esconde la ayuda de estilos
     event.preventDefault();
     if ( $(this).hasClass("hide_markdown_help") ){
       $(this).text("ver ayuda de estilos");
       $(this).removeClass("hide_markdown_help");
     } else {
       $(this).addClass("hide_markdown_help");
       $(this).text("esconder ayuda de estilos");
     }
     $(this).parent().next().slideToggle("slow", "linear");
   });

  var country_list = [
    "Afganistán",
    "Akrotiri",
    "Albania",
    "Alemania",
    "Andorra",
    "Angola",
    "Anguila",
    "Antártida",
    "Antigua y Barbuda",
    "Antillas Neerlandesas",
    "Arabia Saudí",
    "Arctic Ocean",
    "Argelia",
    "Argentina",
    "Armenia",
    "Aruba",
    "Ashmore and Cartier Islands",
    "Atlantic Ocean",
    "Australia",
    "Austria",
    "Azerbaiyán",
    "Bahamas",
    "Bahráin",
    "Bangladesh",
    "Barbados",
    "Bélgica",
    "Belice",
    "Benín",
    "Bermudas",
    "Bielorrusia",
    "Birmania; Myanmar",
    "Bolivia",
    "Bosnia y Hercegovina",
    "Botsuana",
    "Brasil",
    "Brunéi",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Bután",
    "Cabo Verde",
    "Camboya",
    "Camerún",
    "Canadá",
    "Chad",
    "Chile",
    "China",
    "Chipre",
    "Clipperton Island",
    "Colombia",
    "Comoras",
    "Congo",
    "Coral Sea Islands",
    "Corea del Norte",
    "Corea del Sur",
    "Costa de Marfil",
    "Costa Rica",
    "Croacia",
    "Cuba",
    "Dhekelia",
    "Dinamarca",
    "Dominica",
    "Ecuador",
    "Egipto",
    "El Salvador",
    "El Vaticano",
    "Emiratos Árabes Unidos",
    "Eritrea",
    "Eslovaquia",
    "Eslovenia",
    "España",
    "Estados Unidos",
    "Estonia",
    "Etiopía",
    "Filipinas",
    "Finlandia",
    "Fiyi",
    "Francia",
    "Gabón",
    "Gambia",
    "Gaza Strip",
    "Georgia",
    "Ghana",
    "Gibraltar",
    "Granada",
    "Grecia",
    "Groenlandia",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea Ecuatorial",
    "Guinea-Bissau",
    "Guyana",
    "Haití",
    "Honduras",
    "Hong Kong",
    "Hungría",
    "India",
    "Indian Ocean",
    "Indonesia",
    "Irán",
    "Iraq",
    "Irlanda",
    "Isla Bouvet",
    "Isla Christmas",
    "Isla Norfolk",
    "Islandia",
    "Islas Caimán",
    "Islas Cocos",
    "Islas Cook",
    "Islas Feroe",
    "Islas Georgia del Sur y Sandwich del Sur",
    "Islas Heard y McDonald",
    "Islas Malvinas",
    "Islas Marianas del Norte",
    "Islas Marshall",
    "Islas Pitcairn",
    "Islas Salomón",
    "Islas Turcas y Caicos",
    "Islas Vírgenes Americanas",
    "Islas Vírgenes Británicas",
    "Israel",
    "Italia",
    "Jamaica",
    "Jan Mayen",
    "Japón",
    "Jersey",
    "Jordania",
    "Kazajistán",
    "Kenia",
    "Kirguizistán",
    "Kiribati",
    "Kuwait",
    "Laos",
    "Lesoto",
    "Letonia",
    "Líbano",
    "Liberia",
    "Libia",
    "Liechtenstein",
    "Lituania",
    "Luxemburgo",
    "Macao",
    "Macedonia",
    "Madagascar",
    "Malasia",
    "Malaui",
    "Maldivas",
    "Malí",
    "Malta",
    "Man, Isle of",
    "Marruecos",
    "Mauricio",
    "Mauritania",
    "Mayotte",
    "México",
    "Micronesia",
    "Moldavia",
    "Mónaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Mozambique",
    "Mundo",
    "Namibia",
    "Nauru",
    "Navassa Island",
    "Nepal",
    "Nicaragua",
    "Níger",
    "Nigeria",
    "Niue",
    "Noruega",
    "Nueva Caledonia",
    "Nueva Zelanda",
    "Omán",
    "Pacific Ocean",
    "Países Bajos",
    "Pakistán",
    "Palaos",
    "Panamá",
    "Papúa-Nueva Guinea",
    "Paracel Islands",
    "Paraguay",
    "Perú",
    "Polinesia Francesa",
    "Polonia",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reino Unido",
    "República Centroafricana",
    "República Checa",
    "República Democrática del Congo",
    "República Dominicana",
    "Ruanda",
    "Rumania",
    "Rusia",
    "Sáhara Occidental",
    "Samoa",
    "Samoa Americana",
    "San Cristóbal y Nieves",
    "San Marino",
    "San Pedro y Miquelón",
    "San Vicente y las Granadinas",
    "Santa Helena",
    "Santa Lucía",
    "Santo Tomé y Príncipe",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leona",
    "Singapur",
    "Siria",
    "Somalia",
    "Southern Ocean",
    "Spratly Islands",
    "Sri Lanka",
    "Suazilandia",
    "Sudáfrica",
    "Sudán",
    "Suecia",
    "Suiza",
    "Surinam",
    "Svalbard y Jan Mayen",
    "Tailandia",
    "Taiwán",
    "Tanzania",
    "Tayikistán",
    "Territorio Británico del Océano Indico",
    "Territorios Australes Franceses",
    "Timor Oriental",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad y Tobago",
    "Túnez",
    "Turkmenistán",
    "Turquía",
    "Tuvalu",
    "Ucrania",
    "Uganda",
    "Unión Europea",
    "Uruguay",
    "Uzbekistán",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Wake Island",
    "Wallis y Futuna",
    "West Bank",
    "Yemen",
    "Yibuti",
    "Zambia",
    "Zimbabue"
  ];

  // sugerencia de paises
  $( "#map-country" ).autocomplete({
    source: country_list
  });

  // para el checkbox de "Soy el autor"
  check_author_checker();

  $('.author_myself').on('change', function(){
    check_author_checker();
  })

});
