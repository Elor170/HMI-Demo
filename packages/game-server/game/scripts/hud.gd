extends CanvasLayer

@onready var fps_counter = $fps
@onready var is_recording = $is_recording

# Called when the node enters the scene tree for the first time.
func _ready():
	pass

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	fps_counter.text = "FPS: %s" % [Engine.get_frames_per_second()]
	if Globals.is_recording:
		is_recording.text = "Recording Logs: TRUE"
		is_recording.add_theme_color_override("font_color", "green")
	else:
		is_recording.text = "Recording Logs: FALSE"
		is_recording.add_theme_color_override("font_color", "red")
		
