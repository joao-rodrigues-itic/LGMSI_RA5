function xmlToJson(){
    let text = `<?xml version="1.0" encoding="UTF-8"?>
                <alumne>
                    <id>1</id>
                    <nom>Anna</nom>
                    <edat>20</edat>
                    <curs>DAW</curs>
                </alumne>`

    let index = '<?xml version="1.0" encoding="UTF-8"?>';
    
    text = text.replace(index,"");
    text = text.replaceAll(" ","");
    text = text.replaceAll("\n", "");

    let obertura = CalculatePositions(text,"<");
    let tancament = CalculatePositions(text,">");

    text = text.substring(tancament[0]+1, obertura[obertura.length-1]); //Quitar arrel
    
    let obertura1 = CalculatePositions(text,"<");
    let tancament1 = CalculatePositions(text,">");
    //console.log(obertura1);
    //console.log(tancament1);

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

    console.log(json);
}

xmlToJson();

function CalculatePositions(text,stringToSearch){
    let array=[];
    for(let i=0; i<text.length; i++){
        if(text.charAt(i)==stringToSearch){
            array.push(i);
        }

    }
    return array;
}