function uni_click(index, obj)
{
    if(uni_array[index] == "0")
    {
        uni_array[index] = "1";
        obj.html("UNI " + index + ": 1");
        obj.css("background-color", "red");
        console.log("UNI " + index + " SWITCHED TO 1!");
    }
    else if (uni_array[index] == "1")
    {
        uni_array[index] = "0";
        obj.html("UNI " + index + ": 0");
        obj.css("background-color", "rgba(255, 255, 255, 0.8)");
        console.log("UNI " + index + " SWITCHED TO 0!");
    }
    else
    {
        console.log("UNI " + index + " ERROR!");
    }
}

function update_uni_button_states() // lazy way of updating all uni button physical states... should probably map the buttons to their array indexes at some point lol
{
    for(let x = 0; x < 2; x++)
    {
        uni_click(0, $('#uni0'));
        uni_click(1, $('#uni1'));
        uni_click(2, $('#uni2'));
        uni_click(3, $('#uni3'));
        uni_click(4, $('#uni4'));
        uni_click(5, $('#uni5'));
        uni_click(6, $('#uni6'));
        uni_click(7, $('#uni7'));
        uni_click(8, $('#uni8'));
        uni_click(9, $('#uni9'));
        uni_click(10, $('#uni10'));
        uni_click(11, $('#uni11'));
    }
}

for(let x = 0; x < 12; x++)
{
    $(`#uni${x}`).click(()=>uni_click(`${x}`, $(`#uni${x}`)));
}

function stack_click(index)
{
    if(index >= reg_stack_threshold)
    {
        for(let x = 0; x < (reg_array[index].length); x++)
        console.log((reg_array[index])[x]);
    }
}

for(let x = 10; x < 16; x++)
{
    $(`#stack${x}`).click(()=>stack_click(`${x}`));
}


/*
$('#uni0').click(()=>uni_click(0, $('#uni0')));
$('#uni1').click(()=>uni_click(1, $('#uni1')));
$('#uni2').click(()=>uni_click(2, $('#uni2')));
$('#uni3').click(()=>uni_click(3, $('#uni3')));
$('#uni4').click(()=>uni_click(4, $('#uni4')));
$('#uni5').click(()=>uni_click(5, $('#uni5')));
$('#uni6').click(()=>uni_click(6, $('#uni6')));
$('#uni7').click(()=>uni_click(7, $('#uni7')));
$('#uni8').click(()=>uni_click(8, $('#uni8')));
$('#uni9').click(()=>uni_click(9, $('#uni9')));
$('#uni10').click(()=>uni_click(10, $('#uni10')));
$('#uni11').click(()=>uni_click(11, $('#uni11')));
*/


