def get_minute_from_background_position(background_position):
    width_cell = 36  
    height_cell = 36.3
    
    position = background_position.replace('background-position:', '').strip().split(' ')
    x = float(position[0].replace('px', '').strip())
    y = float(position[1].replace('px', '').replace(';', '').strip())

    col = int(-x // width_cell)  
    row = int(-y // height_cell)  

    if row == 11 and col == 0:
        minute = 120  
    elif row == 13:
        minute = -1  
    elif 0 <= row < 12 and 0 <= col < 10:  
        minute = (row * 10) + col + 11 
    else:
        minute = -1  

    return minute
