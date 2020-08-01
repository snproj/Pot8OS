var tape_str = "";

function read_tape()
{
    console.log("------- READING TAPE -------")

    tape_str = $('#tape').val();

    let index = 0;

    let uni_index = 0;

    //instr_ptr = 0;

    let index_ignore_flag = 0;

    for(;index < tape_str.length; index++)
    {
        current_char = tape_str[index];
        console.log("CURRENT_CHAR IS: " + current_char);
        console.log("UNI_INDEX IS : " + uni_index);
        
        
        if(current_char == "0" || current_char == "1")
        {
            uni_array[uni_index] = current_char;
        }
        else if(current_char == "S")
        {
            set_shift_flag($('#shift_key'));
            console.log("SHIFT KEY TOGGLED");
            index_ignore_flag = 1;
        }
        else if(current_char == ";")
        {
            parse(); // to be added: parse() returns jmp_value;
            index_ignore_flag = 1;
            update_instr_ptr(1); // to be added: jmp circuitry
        }
        else
        {
            index_ignore_flag = 1;
        }


        if(index_ignore_flag == 0)
        {
            if(uni_index < 11)
            {
            uni_index++;
            }
            else // When uni_index = 11, do not incr any further
            {
                // Reset uni_index to point to instruction slot 0
                uni_index = 0;
            }
        }
        else if(index_ignore_flag == 1)
        {
            // Do nothing
        }

        index_ignore_flag = 0;
    }

    update_uni_button_states();
    console.log("------- TAPE FINISHED -------")

}

$('#read').click(()=>read_tape());