extends CanvasLayer

@onready var fps_counter = $fps
@onready var pointer = $pointer

# Called when the node enters the scene tree for the first time.
func _ready():
	pointer.position = get_viewport().size / 2


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	fps_counter.text = "FPS: %s" % [Engine.get_frames_per_second()]
