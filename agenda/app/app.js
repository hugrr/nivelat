window.onload = function(){
    getJSON(function({ citas }){
        // data contains the incoming information
        const schedule = document.querySelector('.agenda');

        var eventosEnHTML = '';
        for( dia in citas) eventosEnHTML += citas[dia].map(d => Section({ ...d, dia: dia })).join('')
        schedule.innerHTML += eventosEnHTML;

    });
}

function getJSON(callback){
    fetch('./agenda.json')
        .then(function(res) {
            if(res.ok) return res.json();
            else{
                console.error("request con error");
                alert("Error in the request");
            }
        })
        .then(function(data){
            console.log("data dentro de un objecto", data);
            callback(data);
        })
        .catch(function(err) { console.error("ha ocurrido un error", err); })
}

function Section(evento){
    const { nombre, hora_inicio, hora_termino, dia } = evento;
    console.log("El evento es esto: ",evento);

    return `<div class="session  track-1" style="grid-column: ${dia}; grid-row: time-${hora_inicio.replace(":","")} / time-${hora_termino.replace(":","")};">
        <h3 class="title">${nombre}</h3>
        <span class="time">${hora_inicio} - ${hora_termino}</span>
    </div>`;


}



