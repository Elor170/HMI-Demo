class_name Ball
extends RigidBody3D


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	if Global.is_menu_visible:
		set_physics_process(false)
	else:
		set_physics_process(true)
