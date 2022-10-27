$('#dodajForm').submit(function(){
    event.preventDefault();
    console.log("Dodaj je pokrenuto");
    const $form = $(this);
    const $inputs = $form.find('input, select, button, textarea');
    const serijalizacija = $form.serialize();
    let red_za_unos = $form.serializeArray().reduce(function(json, {name, value}){
        json[name]=value;
        return json;
    });
    console.log("Red za unos");
    console.log(red_za_unos);
    console.log(serijalizacija);
    
    request = $.ajax({
        url:'handler/add.php',
        type:'post',
        data:serijalizacija
    });

    request.done(function(response, textStatus, jqXHR){
        if(response==="Success"){
            alert("Kolokvijum je zakazan");
            console.log("Uspesno zakazivanje");
            // location.reload(true);
            appendRow(red_za_unos);
        }
        else console.log("Kolokvijum nije zakazan "+ response);
        console.log(response);
    });

    request.fail(function(jqXHR, textStatus, errorThrown){
        console.error('Sledeca greska se desila: '+textStatus, errorThrown)
    });

});

$("#btn-obrisi").click(function(){
    const checked = $("input[type=radio]:checked");
    console.log(checked);
    request = $.ajax({
        url:"handler/delete.php",
        type:"post",
        data:{"prijavaID":checked.val()}
    });
    request.done(function(response){
        if(response==="Success"){
            checked.closest("tr").remove();
            alert("Prijava je obrisana");
        }else{
            alert("Prijava nije obrisana! "+response);
        }
    });
});

function appendRow(row){
    $.get("handler/getLast.php", function(data){
        console.log(data);
        $("#pregled tbody").append(
            `
            <tr>
                <td>${row.value}</td>
                <td>${row.katedra}</td>
                <td>${row.sala}</td>
                <td>${row.datum}</td>
                <td>
                    <label class="custom-radio-btn">
                        <input type="radio" name="checked-donut" value=${data}>
                        <span class="checkmark"></span>
                    </label>
                </td>

            </tr>
            `
        );
    });
}