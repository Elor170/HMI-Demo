extends Node

# Is recording controller
var is_recording = false

# Record buffer time control
var rec_timestamp_pos = 0
var rec_timestamp_arr: Array[int] = [1, 5, 10, 30, 60]
signal _on_rec_timestamp_change

func increase_rec_time():
	_on_rec_timestamp_change.emit()
	if rec_timestamp_pos >= rec_timestamp_arr.size() - 1:
		rec_timestamp_pos = 0
	else:
		rec_timestamp_pos += 1

func decrease_rec_time():
	_on_rec_timestamp_change.emit()
	if rec_timestamp_pos == 0:
		rec_timestamp_pos = rec_timestamp_arr.size() - 1
	else:
		rec_timestamp_pos -= 1
