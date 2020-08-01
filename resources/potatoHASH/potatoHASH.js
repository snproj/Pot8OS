var flag_array =
[
    0,
    0
]
/*
var stack_array =
[
    [0],
    [0],
    [0],
    [0],
    [0],
    [0]
]
*/

var reg_array =
[
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    [0],
    [0],
    [0],
    [0],
    [0],
    [0]

]

let reg_stack_threshold = 10;


var uni_array =
[
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0"
]

var cmp_flag_array =
[
    "NA",
    "NA",
    "NA",
    "NA"
]

var shift_flag = 0;

var instr_ptr = 0;

var heap_array =
[

]

function init_heap(val)
{
    for(let x = 0; x < val; x++)
    {
        heap_array.push(0);
        $('#heap_container').append(`<div id="heap${x}" class="HEAP">HEAP ${x}: </div>`)
    }
}

init_heap(256);

/*
heap_array[5] = 5;

for(let x = 0; x < 256; x++)
{
    console.log(heap_array[x]);
}
*/

///////////////////////////// DATA INITIALIZED /////////////////////////////

///////////////////////////// KEY BINDINGS IN KEYBINDINGS.JS /////////////////////////////

$('#shift_key').click(()=>set_shift_flag($('#shift_key')));

function set_shift_flag(obj)
{
    if(shift_flag == "0")
    {
        shift_flag = "1";
        //obj.html("UNI " + (index + 1) + ": 1");
        obj.css("background-color", "red");
        console.log("SHIFT FLAG ON");
    }
    else if (shift_flag == "1")
    {
        shift_flag = "0";
        //obj.html("UNI " + (index + 1) + ": 0");
        obj.css("background-color", "rgba(255, 255, 255, 0.8)");
        console.log("SHIFT FLAG OFF");
    }
    else
    {
        console.log("SHIFT FLAG ERROR!");
    }
}

$('#load').click(()=>{parse(); update_instr_ptr(1);}); // handle manual jump --> dun goofd? or maybe not

function update_instr_ptr(val)
{
    instr_ptr += val;
    $('#instr_ptr').html("INSTR: " + instr_ptr);
    console.log("INSTR: " + instr_ptr);
}

function parse()
{
    var uni_first_loc = "";
    var uni_second_loc = "";
    var uni_opcode = "";

    for(let index = 4; index < 8; index++)
    {
        uni_first_loc += uni_array[index];
    }

    for(let index = 8; index < 12; index++)
    {
        uni_second_loc += uni_array[index];
    }

    for(let index = 0; index < 4; index++)
    {
        uni_opcode += uni_array[index];
    }

    console.log("UNI_OPCODE IS: " + uni_opcode);
    console.log("UNI_FIRST_LOC IS: " + uni_first_loc);
    console.log("UNI_SECOND_LOC IS: " + uni_second_loc);

    uni_opcode = "0b" + uni_opcode;
    uni_opcode_val = Number(uni_opcode);

    uni_first_loc = "0b" + uni_first_loc;
    uni_first_loc_val = Number(uni_first_loc);

    uni_second_loc = "0b" + uni_second_loc;
    uni_second_loc_val = Number(uni_second_loc);

    command_directory(uni_opcode_val, uni_first_loc_val, uni_second_loc_val, shift_flag);

    /*
    console.log("UNI STRING IS " + uni_string);

    uni_string = "0b" + uni_string;

    console.log("UNI STRING IS " + uni_string);

    uni_val = Number(uni_string);

    console.log("UNI VAL IS " + uni_val);

    uni_val += 0b11;

    console.log("UNI VAL IS " + uni_val);
    */

    

}


function command_directory(uni_opcode_val, uni_first_loc_val, uni_second_loc_val, shift_flag)
{
    console.log("<<<<< LOAD SEQUENCE STARTED >>>>>");

    console.log("UNI_OPCODE_VAL RECEIVED: " + uni_opcode_val);
    console.log("UNI_FIRST_LOC_VAL RECEIVED: " + uni_first_loc_val);
    console.log("UNI_SECOND_LOC_VAL RECEIVED: " + uni_second_loc_val);
    console.log("SHIFT_FLAG RECEIVED: " + shift_flag);

    switch(uni_opcode_val)
    {
        case 0:
            if(shift_flag == 0)
            {
                add(uni_first_loc_val, uni_second_loc_val);
                break;
            }
            else if(shift_flag == 1)
            {
                from_uni_add(uni_first_loc_val, uni_second_loc_val);
                break;
            }
        case 1:
            if(shift_flag == 0)
            {
                sub(uni_first_loc_val, uni_second_loc_val);
                break;
            }
            else if(shift_flag == 1)
            {
                from_uni_sub(uni_first_loc_val, uni_second_loc_val);
                break;
            }
        case 2:
            if(shift_flag == 0)
            {
                mul (uni_first_loc_val, uni_second_loc_val);
                break;
            }
            else if(shift_flag == 1)
            {
                from_uni_mul (uni_first_loc_val, uni_second_loc_val);
                break;
            }
            break;
        case 3:
            if(shift_flag == 0)
            {
                clr(uni_first_loc_val, uni_second_loc_val);
                break;
            }
            else if(shift_flag == 1)
            {
                // NOTHING YET;
            }
            break;
        case 4:
            if(shift_flag == 0)
            {
                flip(uni_first_loc_val, uni_second_loc_val);
                break;
            }
            else if(shift_flag == 1)
            {
                // NOTHING YET;
            }
            break;
        case 5: // mov
            if(shift_flag == 0)
            {
                mov(uni_first_loc_val, uni_second_loc_val);
                break;
            }
            else if(shift_flag == 1)
            {
                from_uni_mov(uni_first_loc_val, uni_second_loc_val);
                break;
            }
            break;
        case 6: // cut
            break;
        case 7: // jmp
            if(shift_flag == 0)
            {
                jmp(uni_first_loc_val, uni_second_loc_val);
                break;
            }
            else if(shift_flag == 1)
            {
                // NOTHING YET;
            }
            break;
        case 8: // should be cmp? are we skipping slp??
            break;
        case 9:
            if(shift_flag == 0)
            {
                prt(uni_first_loc_val, uni_second_loc_val);
                break;
            }
            else if(shift_flag == 1)
            {
                // NOTHING YET;
            }
            break;
            break;
        case 10:
            break;
        case 11:
            break;
        case 12:
            break;
        case 13:
            break;
        case 14:
            break;
        case 15:
            if(shift_flag == 0)
            {
                load_big_number(uni_first_loc_val, uni_second_loc_val);
                break;
            }
            else if(shift_flag == 1)
            {
                // NOTHING YET;
            }
            break;          
    }
}


