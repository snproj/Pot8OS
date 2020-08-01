function set_dun_goofd_flag()
{
    console.log("OHHHHHHHHHHH");
    let goofd_interval = setInterval(flash_dun_goofd_flag, 50);
    
    setTimeout(clearInterval, 3000, goofd_interval);
}

function flash_dun_goofd_flag()
{
    console.log("U DUN GOOF'D");
    if($('#flag0').css("background-color") == "rgba(255, 255, 255, 0.8)")
    {
        $('#flag0').css("background-color", "red");
    }
    else
    {
        $('#flag0').css("background-color", "rgba(255, 255, 255, 0.8)");
    }
}

/*
function update_register_text(index, reg_amount)
{
    switch(index)
    {
        case 0:
            $('#reg0').html("REG 0: " + reg_amount);
            break;
        case 1:
            $('#reg1').html("REG 1: " + reg_amount);
            break;
        case 2:
            $('#reg2').html("REG 2: " + reg_amount);
            break;
        case 3:
            $('#reg3').html("REG 3: " + reg_amount);
            break;
        case 4:
            $('#reg4').html("REG 4: " + reg_amount);
            break;
        case 5:
            $('#reg5').html("REG 5: " + reg_amount);
            break;
        case 6:
            $('#reg6').html("REG 6: " + reg_amount);
            break;
        case 7:
            $('#reg7').html("REG 7: " + reg_amount);
            break;
        case 8:
            $('#reg8').html("REG 8: " + reg_amount);
            break;
        case 9:
            $('#reg9').html("REG 9: " + reg_amount);
            break;
        default:
            set_dun_goofd_flag();      
    }
}
*/

function update_register_text(index, reg_amount)
{
    if (index < reg_stack_threshold)
        {
            $(`#reg${index}`).html(`REG ${index}: ` + reg_amount);
        }
    else if (index >= reg_stack_threshold)
    {
        $(`#stack${index}`).html(`STACK ${index}: ` + reg_amount);
    }
}

/*
function update_stack_text(index, stack_amount)
{
    $(`#stack${index}`).html(`STACK ${index}: ` + stack_amount);
}
*/

function jmp_conditions(cmp_flag, cond) // cmp_flag can be: "G", "L", "E" or "Z"; unconditional jumps do not require a flag
{
    console.log("JMP_CONDITIONS CALLED WITH CMP FLAG: " + cmp_flag + " AND COND :" + cond );

    let jump_or_not = 0;

    switch(cond)
    {
        case 0: // unconditional jump
            jump_or_not = 1;
            console.log("--- UNCONDITIONAL JUMP ---");
            break;
        case 1: // if greater than, then jump
            if(cmp_flag == "G")
            {
                jump_or_not = 1;
            }
            else
            {
                if(cmp_flag == "NA")
                {
                    set_dun_goofd_flag();
                    console.log("ERROR: NON-INITIALIZED FLAG USED TO COMPARE");
                }
                jump_or_not = 0;
            }
            break;
        case 2: // if lesser than, then jump
            if(cmp_flag == "L")
            {
                jump_or_not = 1;
            }
            else
            {
                if(cmp_flag == "NA")
                {
                    set_dun_goofd_flag();
                    console.log("ERROR: NON-INITIALIZED FLAG USED TO COMPARE");
                }
                jump_or_not = 0;
            }
            break;
        case 3: // if equal, then jump
            if(cmp_flag == "E")
            {
                jump_or_not = 1;
            }
            else
            {
                if(cmp_flag == "NA")
                {
                    set_dun_goofd_flag();
                    console.log("ERROR: NON-INITIALIZED FLAG USED TO COMPARE");
                }
                jump_or_not = 0;
            }
            break;
        default:
            console.log("JMP_COMDITIONS ERROR 1!");
            break;
    }

    return jump_or_not;
}


///////////////////////////// OPCODES BELOW /////////////////////////////


// 0000
function add(uni_first_loc_val, uni_second_loc_val)
{
    console.log("<<<<< ADD >>>>>");

    //let sum_added = reg_array[uni_first_loc_val];
    //let prev_number = reg_array[uni_second_loc_val];
    //let new_total = sum_added + prev_number;
    
    
    if(uni_first_loc_val < reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        let sum_added = reg_array[uni_first_loc_val];
        let prev_number = reg_array[uni_second_loc_val];
        let new_total = sum_added + prev_number;   
        
        update_register_text(uni_second_loc_val, new_total);
        reg_array[uni_second_loc_val] = new_total;
    }
    else if (uni_first_loc_val >= reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        let sum_added = (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-1];
        let prev_number = reg_array[uni_second_loc_val];
        let new_total = sum_added + prev_number;   
        
        update_register_text(uni_second_loc_val, new_total);
        reg_array[uni_second_loc_val] = new_total;
    }
    else if (uni_first_loc_val < reg_stack_threshold && uni_second_loc_val >= reg_stack_threshold)
    {
        let sum_added = reg_array[uni_first_loc_val];
        let prev_number = (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1];
        let new_total = sum_added + prev_number;   
        
        update_register_text(uni_second_loc_val, new_total);
        (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1] = new_total;
    }
    else if (uni_first_loc_val >= reg_stack_threshold && uni_second_loc_val >= reg_stack_threshold)
    {
        let sum_added = (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-1];
        let prev_number = (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1];
        let new_total = sum_added + prev_number;   

        update_register_text(uni_second_loc_val, new_total);
        (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1] = new_total;
    }
}


// 0000 + SHIFT
function from_uni_add(uni_first_loc_val, uni_second_loc_val)
{
    console.log("<<<<< FROM UNI ADD >>>>>");

    //let sum_added = reg_array[uni_first_loc_val];
    //let prev_number = reg_array[uni_second_loc_val];
    //let new_total = sum_added + prev_number;
    
    
    if(uni_second_loc_val < reg_stack_threshold)
    {
        let sum_added = uni_first_loc_val;
        let prev_number = reg_array[uni_second_loc_val];
        let new_total = sum_added + prev_number;   
        
        update_register_text(uni_second_loc_val, new_total);
        reg_array[uni_second_loc_val] = new_total;
    }
    else if (uni_second_loc_val >= reg_stack_threshold)
    {
        let sum_added = uni_first_loc_val;
        let prev_number = (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1];
        let new_total = sum_added + prev_number;   

        update_register_text(uni_second_loc_val, new_total);
        (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1] = new_total;
    }
}


// 0001
function sub(uni_first_loc_val, uni_second_loc_val)
{
    console.log("<<<<< SUB >>>>>");

    //let sum_minused = reg_array[uni_first_loc_val];
    //let prev_number = reg_array[uni_second_loc_val];
    //let new_total = prev_number - sum_minused;

    
    /*
    if(uni_first_loc_val < reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        update_register_text(uni_second_loc_val, new_total);
        reg_array[uni_second_loc_val] = new_total;
    }
    else
    {
        set_dun_goofd_flag();
    }
    */

    if(uni_first_loc_val < reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        let sum_minused = reg_array[uni_first_loc_val];
        let prev_number = reg_array[uni_second_loc_val];
        let new_total = prev_number - sum_minused;
        
        update_register_text(uni_second_loc_val, new_total);
        reg_array[uni_second_loc_val] = new_total;
    }
    else if (uni_first_loc_val >= reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        let sum_minused = (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-1];
        let prev_number = reg_array[uni_second_loc_val];
        let new_total = prev_number - sum_minused;   
        
        update_register_text(uni_second_loc_val, new_total);
        reg_array[uni_second_loc_val] = new_total;
    }
    else if (uni_first_loc_val < reg_stack_threshold && uni_second_loc_val >= reg_stack_threshold)
    {
        let sum_minused = reg_array[uni_first_loc_val];
        let prev_number = (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1];
        let new_total = prev_number - sum_minused;   
        
        update_register_text(uni_second_loc_val, new_total);
        (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1] = new_total;
    }
    else if (uni_first_loc_val >= reg_stack_threshold && uni_second_loc_val >= reg_stack_threshold)
    {
        let sum_minused = (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-1];
        let prev_number = (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1];
        let new_total = prev_number - sum_minused;   

        update_register_text(uni_second_loc_val, new_total);
        (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1] = new_total;
    }
}


// 0001 + SHIFT
function from_uni_sub(uni_first_loc_val, uni_second_loc_val)
{
    console.log("<<<<< FROM UNI SUB >>>>>");

    if(uni_second_loc_val < reg_stack_threshold)
    {
        let sum_minused = uni_first_loc_val;
        let prev_number = reg_array[uni_second_loc_val];
        let new_total = prev_number - sum_minused;
        
        update_register_text(uni_second_loc_val, new_total);
        reg_array[uni_second_loc_val] = new_total;
    }
    else if (uni_second_loc_val >= reg_stack_threshold)
    {
        let sum_minused = uni_first_loc_val;
        let prev_number = (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1];
        let new_total = prev_number - sum_minused;   

        update_register_text(uni_second_loc_val, new_total);
        (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1] = new_total;
    }
}


// 0010
function mul(uni_first_loc_val, uni_second_loc_val)
{
    console.log("<<<<< MUL >>>>>");

    //let sum_multiplied = reg_array[uni_first_loc_val];
    //let prev_number = reg_array[uni_second_loc_val];
    //let new_total = sum_multiplied * prev_number;

    
    /*
    if(uni_first_loc_val < reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        update_register_text(uni_second_loc_val, new_total);
        reg_array[uni_second_loc_val] = new_total;
    }
    else
    {
        set_dun_goofd_flag();
    }
    */

    if(uni_first_loc_val < reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        let sum_multiplied = reg_array[uni_first_loc_val];
        let prev_number = reg_array[uni_second_loc_val];
        let new_total = sum_multiplied * prev_number;   
        
        update_register_text(uni_second_loc_val, new_total);
        reg_array[uni_second_loc_val] = new_total;
    }
    else if (uni_first_loc_val >= reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        let sum_multiplied = (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-1];
        let prev_number = reg_array[uni_second_loc_val];
        let new_total = sum_multiplied * prev_number;   
        
        update_register_text(uni_second_loc_val, new_total);
        reg_array[uni_second_loc_val] = new_total;
    }
    else if (uni_first_loc_val < reg_stack_threshold && uni_second_loc_val >= reg_stack_threshold)
    {
        let sum_multiplied = reg_array[uni_first_loc_val];
        let prev_number = (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1];
        let new_total = sum_multiplied * prev_number;   
        
        update_register_text(uni_second_loc_val, new_total);
        (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1] = new_total;
    }
    else if (uni_first_loc_val >= reg_stack_threshold && uni_second_loc_val >= reg_stack_threshold)
    {
        let sum_multiplied = (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-1];
        let prev_number = (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1];
        let new_total = sum_multiplied * prev_number;   

        update_register_text(uni_second_loc_val, new_total);
        (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1] = new_total;
    }

}


//0010 + SHIFT
function from_uni_mul(uni_first_loc_val, uni_second_loc_val)
{
    console.log("<<<<< FROM UNI MUL >>>>>");


    if(uni_second_loc_val < reg_stack_threshold)
    {
        let sum_multiplied = uni_first_loc_val;
        let prev_number = reg_array[uni_second_loc_val];
        let new_total = sum_multiplied * prev_number;   
        
        update_register_text(uni_second_loc_val, new_total);
        reg_array[uni_second_loc_val] = new_total;
    }
    else if (uni_second_loc_val >= reg_stack_threshold)
    {
        let sum_multiplied = uni_first_loc_val;
        let prev_number = (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1];
        let new_total = sum_multiplied * prev_number;   

        update_register_text(uni_second_loc_val, new_total);
        (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-1] = new_total;
    }

}


// 0011
function clr(uni_first_loc_val, uni_second_loc_val)
{
    console.log("<<<<< CLR >>>>>");

    if(uni_first_loc_val < reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        if(uni_first_loc_val == uni_second_loc_val)
        {
            update_register_text(uni_first_loc_val, 0);
            reg_array[uni_first_loc_val] = 0;
        }
        else
        {
            update_register_text(uni_first_loc_val, 0);
            update_register_text(uni_second_loc_val, 0);
    
            reg_array[uni_first_loc_val] = 0;
            reg_array[uni_second_loc_val] = 0;    
        }
    }
    else if (uni_first_loc_val >= reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        if((reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-2] != null)
        {
            update_register_text(uni_first_loc_val, (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-2]);
            update_register_text(uni_second_loc_val, 0);
    
            (reg_array[uni_first_loc_val]).pop();
            reg_array[uni_second_loc_val] = 0;
        }
        else
        {
            set_dun_goofd_flag();
        }
    }
    else if (uni_first_loc_val < reg_stack_threshold && uni_second_loc_val >= reg_stack_threshold)
    {
        if((reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-2] != null)
        {
            update_register_text(uni_first_loc_val, 0);
            update_register_text(uni_second_loc_val, (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-2]);
    
            reg_array[uni_first_loc_val] = 0;
            (reg_array[uni_second_loc_val]).pop();
        }
        else
        {
            set_dun_goofd_flag();
        }
    }
    else
    {
        if(uni_first_loc_val == uni_second_loc_val)
        {
            console.log("BOTH ARE STACKS1");
            if((reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-2] != null)
            {
                update_register_text(uni_first_loc_val, (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-2]);
                (reg_array[uni_first_loc_val]).pop();            
            }
            else
            {
                set_dun_goofd_flag();
            }
        }
        else
        {
            console.log("BOTH ARE STACKS2");
            if((reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-2] != null && (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-2] != null)
            {
                update_register_text(uni_first_loc_val, (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-2]);
                update_register_text(uni_second_loc_val, (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length-2]);
        
                (reg_array[uni_first_loc_val]).pop();
                (reg_array[uni_second_loc_val]).pop();            
            }
            else
            {
                set_dun_goofd_flag();
            }
        }
    }
}

// 0011 + SHIFT clears stacks completely


//0100
function flip(uni_first_loc_val, uni_second_loc_val)
{
    console.log("<<<<< FLIP >>>>>");

    //let first_flipped = - reg_array[uni_first_loc_val];
    //let second_flipped = - reg_array[uni_second_loc_val];

    if(uni_first_loc_val < reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        let first_flipped = - reg_array[uni_first_loc_val];
        let second_flipped = - reg_array[uni_second_loc_val];

        if(uni_first_loc_val == uni_second_loc_val)
        {
            update_register_text(uni_first_loc_val, first_flipped);
            reg_array[uni_first_loc_val] = first_flipped;
        }
        else
        {
            update_register_text(uni_first_loc_val, first_flipped);
            update_register_text(uni_second_loc_val, second_flipped);
    
            reg_array[uni_first_loc_val] = first_flipped;
            reg_array[uni_second_loc_val] = second_flipped;   
        }
    }
    else if (uni_first_loc_val >= reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        let first_flipped = - ((reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length - 1]);
        let second_flipped = - reg_array[uni_second_loc_val];

        update_register_text(uni_first_loc_val, first_flipped);
        update_register_text(uni_second_loc_val, second_flipped);
    
        (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length - 1] = first_flipped;
        reg_array[uni_second_loc_val] = second_flipped;   

    }
    else if (uni_first_loc_val < reg_stack_threshold && uni_second_loc_val >= reg_stack_threshold)
    {
        let first_flipped = - reg_array[uni_first_loc_val];
        let second_flipped = - ((reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length - 1]);

        update_register_text(uni_first_loc_val, first_flipped);
        update_register_text(uni_second_loc_val, second_flipped);
    
        reg_array[uni_first_loc_val] = first_flipped;
        (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length - 1] = second_flipped;
    }
    else
    {
        let first_flipped = - ((reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length - 1]);
        let second_flipped = - ((reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length - 1]);

        if(uni_first_loc_val == uni_second_loc_val)
        {
            update_register_text(uni_first_loc_val, first_flipped);
            (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length - 1] = first_flipped;
        }
        else
        {
            update_register_text(uni_first_loc_val, first_flipped);
            update_register_text(uni_second_loc_val, second_flipped);
    
            (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length - 1] = first_flipped;
            (reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length - 1] = second_flipped;   
        }
    }
}


//0101
function mov(uni_first_loc_val, uni_second_loc_val)
{
    console.log("<<<<< MOV >>>>>");
    
    if(uni_first_loc_val < reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        let val_to_be_moved = reg_array[uni_first_loc_val];

        update_register_text(uni_second_loc_val, val_to_be_moved);

        reg_array[uni_second_loc_val] = val_to_be_moved;  
    
    }
    else if (uni_first_loc_val >= reg_stack_threshold && uni_second_loc_val < reg_stack_threshold)
    {
        let val_to_be_moved = (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-1];

        update_register_text(uni_second_loc_val, val_to_be_moved);

        reg_array[uni_second_loc_val] = val_to_be_moved;
        
    }
    else if (uni_first_loc_val < reg_stack_threshold && uni_second_loc_val >= reg_stack_threshold)
    {
        let val_to_be_moved = reg_array[uni_first_loc_val];

        update_register_text(uni_second_loc_val, val_to_be_moved);

        (reg_array[uni_second_loc_val]).push(val_to_be_moved);
    }
    else
    {
        let val_to_be_moved = (reg_array[uni_first_loc_val])[(reg_array[uni_first_loc_val]).length-1];

        update_register_text(uni_second_loc_val, val_to_be_moved);

        (reg_array[uni_second_loc_val]).push(val_to_be_moved);
    }

    
}


//0101 + SHIFT
function from_uni_mov(uni_first_loc_val, uni_second_loc_val)
{
    console.log("<<<<< FROM UNI MOV >>>>>");
    let sum_added = uni_first_loc_val;

    
    /*
    if(uni_second_loc_val < reg_stack_threshold)
    {
        update_register_text(uni_second_loc_val, sum_added);
        reg_array[uni_second_loc_val] = sum_added;
    }
    else
    {
        set_dun_goofd_flag();
    }
    */

    if(uni_second_loc_val < reg_stack_threshold)
    {
        update_register_text(uni_second_loc_val, sum_added);
        reg_array[uni_second_loc_val] = sum_added;
    }
    else if (uni_second_loc_val >= reg_stack_threshold)
    {
        update_register_text(uni_second_loc_val, sum_added);
        (reg_array[uni_second_loc_val]).push(sum_added);
    }
}


//0111
function jmp(uni_first_loc_val, uni_second_loc_val)
{
    console.log("<<<<< JMP >>>>>");

    let uni_first_first = "";
    let uni_first_second = "";

    let uni_first_string = uni_first_loc_val.toString(2);

    let original_length = uni_first_string.length;

    //fill out missing zeroes
    for(let x = 0; x < (4 - original_length); x++)
    {
        uni_first_string = "0" + uni_first_string;
    }

    uni_first_first = uni_first_string[0] + uni_first_string[1];
    uni_first_second = uni_first_string[2] + uni_first_string[3];

    console.log("UNI_FIRST_FIRST :" + uni_first_first);
    console.log("UNI_FIRST_SECOND :" + uni_first_second);

    let uni_first_first_val = Number("0b" + uni_first_first); // cmp_flag
    let uni_first_second_val = Number("0b" + uni_first_second); // cond

    console.log("UNI_FIRST_FIRST_VAL :" + uni_first_first_val);
    console.log("UNI_FIRST_SECOND_VAL :" + uni_first_second_val);

    let jump_or_not = 0; // Default is to NOT jump

    jump_or_not = jmp_conditions(cmp_flag_array[uni_first_first_val], uni_first_second_val);


    /*
    switch(uni_first_second_val) // cond
    {
        case 0:
            jump_or_not = jmp_conditions(cmp_flag_array[uni_first_first_val], 0);
            break;
        case 1:
            jump_or_not = jmp_conditions(cmp_flag_array[uni_first_first_val], 0);
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            console.log("JMP ERROR 1!");
            break;
    }
    
    */

    if(jump_or_not == 1)
    {
        if(uni_second_loc_val < reg_stack_threshold)
        {
            instr_ptr = (reg_array[uni_second_loc_val] - 1); //-1 to make up for the auto incr on clicking LOAD
            $('#instr_ptr').html("INSTR: " + instr_ptr);
            console.log("INSTR JUMPED TO: " + instr_ptr);   
        }
        else if(uni_second_loc_val >= reg_stack_threshold)
        {
            instr_ptr = ((reg_array[uni_second_loc_val])[(reg_array[uni_second_loc_val]).length - 1] - 1); //-1 to make up for the auto incr on clicking LOAD
            $('#instr_ptr').html("INSTR: " + instr_ptr);
            console.log("INSTR JUMPED TO: " + instr_ptr);
        }
    }
    else
    {
        // Do nothing except log to console that a jump was skipped
        console.log("JUMP SKIPPED!");
    }

    //Number("0b" + uni_first_loc_val.toString(2) + uni_second_loc_val.toString(2));
}


//1000 should be compare? are we doing slp??



//1001
function prt(uni_first_loc_val, uni_second_loc_val)
{
    let target_reg_index = uni_first_loc_val;
    let number_of_times = uni_second_loc_val;
    let target_char = "";

    if(target_reg_index < reg_stack_threshold)
    {
        target_char = String.fromCharCode(reg_array[target_reg_index]);
    }
    else if(target_reg_index >= reg_stack_threshold)
    {
        target_char = String.fromCharCode((reg_array[target_reg_index])[(reg_array[target_reg_index]).length-1]);
    }

    for(let x = 0; x < number_of_times; x++)
    {
        $('#text_screen').append(target_char);
    }
}



//1111
function load_big_number(uni_first_loc_val, uni_second_loc_val)
{
    console.log("<<<<< LOAD BIG NUMBER >>>>>");

    let uni_first_string = (uni_first_loc_val.toString(2));
    let uni_second_string = (uni_second_loc_val.toString(2));

    let original_length_first = uni_first_string.length;
    let original_length_second = uni_second_string.length;

    //fill out missing zeroes
    for(let x = 0; x < (4 - original_length_first); x++)
    {
        uni_first_string = "0" + uni_first_string;
    }
    console.log(uni_first_string);

    for(let x = 0; x < (4 - original_length_second); x++)
    {
        uni_second_string = "0" + uni_second_string;
    }
    console.log(uni_second_string);

    let sum_added = Number("0b" + uni_first_string + uni_second_string);

    reg_array[0] = sum_added;
    $('#reg0').html("REG 0: " + reg_array[0]);
}