extends Node3D
@onready var camera = $Camera3D

func spawn_new_cube():
	var new_rb = preload("res://cube_rigidbody.tscn").instantiate()
	new_rb.position.y = 15
	new_rb.position.x = randf_range(-5, 5)
	new_rb.position.z = randf_range(-5, 5)
	add_child(new_rb)

func _process(delta):
	if Input.is_action_just_pressed("spawn_cube"):
		spawn_new_cube()
		
	elif Input.is_action_pressed("move_left"):
		camera.position.x += .5
	elif Input.is_action_pressed("move_right"):
		camera.position.x -= .5
		
	elif Input.is_action_pressed("move_forward"):
		camera.position.z += .5
		
	elif Input.is_action_pressed("move_backwards"):
		camera.position.z -= .5
		
	elif Input.is_action_pressed("move_up"):
		camera.position.y += .5
		
	elif Input.is_action_pressed("move_down"):
		camera.position.y -= .5
		

var rot_x = 0
var rot_y = 0
var LOOKAROUND_SPEED = .0001

#func _input(event):
	#if event is InputEventMouseMotion:
		## modify accumulated mouse rotation
		#rot_x += event.relative.x * LOOKAROUND_SPEED
		#rot_y += event.relative.y * LOOKAROUND_SPEED
		#transform.basis = Basis() # reset rotation
		#camera.rotate_object_local(Vector3(0, 1, 0), rot_x) # first rotate in Y
		#camera.rotate_object_local(Vector3(1, 0, 0), rot_y) # then rotate in X
