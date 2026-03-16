const express = require("express");

const app = express();
const PORT = 3000;

// permet rebre JSON
app.use(express.json());

// servir fitxers estàtics (HTML, JS, CSS)
app.use(express.static("public"));

// endpoint d'exemple
app.post("/convert", (req, res) => {
  const { data } = req.body;

  const result = data.toUpperCase(); // prova simple

  res.json({ result });
});

// endpoint d'exemple per convertir json to xml
app.post("/convertJsonToXml", (req, res) => {
  const { data } = req.body;

  let text = data;

    text = text.replaceAll("{","");
    text = text.replaceAll("}","");
    text = text.replaceAll("\"","");
    text = text.replaceAll(" ", "");
    text = text.replaceAll("\n", "");

    let valors = text.split(",");

    let xml = "<arrel>\n";

    for(let i=0; i<valors.length; i++){
        let valor = valors[i].split(":");
        xml += "<" + valor[0] + ">";
        xml += valor[1];
        xml += "</" + valor[0] + ">\n";
    }
    xml += "</arrel>";

  res.json({ xml });
});

// endpoint d'exemple per convertir xml to json
app.post("/convertXmlToJson", (req, res) => {
  const { data } = req.body;

  let text = data;

  let index = '<?xml version="1.0" encoding="UTF-8"?>';
    
  text = text.replace(index,"");
  text = text.replaceAll(" ","");
  text = text.replaceAll("\n", "");

  let obertura = CalculatePositions(text,"<");
  let tancament = CalculatePositions(text,">");

  text = text.substring(tancament[0]+1, obertura[obertura.length-1]); //Quitar arrel
    
  let obertura1 = CalculatePositions(text,"<");
  let tancament1 = CalculatePositions(text,">");
    
  let json = "{\n";

  for(let i=0; i<obertura1.length; i++){
      if(i%2==0){
          let key = text.substring(obertura1[i]+1, tancament1[i]);
          json += "\"" + key + "\": ";
         let value = text.substring(tancament1[i]+1, obertura1[i+1]);
          json += "\"" + value + "\"";

          if(i<obertura1.length-2){
              json += ",\n";
          }
      }   
  }
  json += "\n}";

  res.json({ json });
});

// funccio auxiliar per calcular posicions de obertura i tancament de xml
function CalculatePositions(text, stringToSearch) {
  let array = [];
  for(let i = 0; i < text.length; i++) {
    if(text.charAt(i) == stringToSearch) {
      array.push(i);
    }
  }
  return array;
}

app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});
