function jsonToXML(){
    let text = `{"id": 1,"nom": "Anna","edat": 20,"curs": "DAW"}`;

    text = text.replaceAll("{","");
    text = text.replaceAll("}","");
    text = text.replaceAll("\"","");
    text = text.replaceAll(" ", "");
    text = text.replaceAll("\n", "");

    let valors = text.split(",");

    let xml = "<arrel>";

    for(let i=0; i<valors.length; i++){
        let valor = valors[i].split(":");
        xml += "<" + valor[0] + ">";
        xml += valor[1];
        xml += "</" + valor[0] + ">\n";
    }
    xml += "</arrel>";
    
    console.log(xml);
}

jsonToXML();