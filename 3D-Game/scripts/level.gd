extends Node3D

@onready var world_objects = []

func spawn_new_cube():
	var new_rb = preload("res://scenes/cube_rigidbody.tscn").instantiate()
	new_rb.position.y = 15
	new_rb.position.x = randf_range(-5, 5)
	new_rb.position.z = randf_range(-5, 5)
	add_child(new_rb)
	world_objects.append(new_rb)
	
func spawn_new_ball():
	var new_ball = preload("res://scenes/Ball.tscn").instantiate()
	new_ball.position.y = 15
	new_ball.position.x = randf_range(-5, 5)
	new_ball.position.z = randf_range(-5, 5)
	add_child(new_ball)
	world_objects.append(new_ball)

func _process(delta):
	if Input.is_action_pressed("spawn_cube"):
		spawn_new_cube()
		
	if Input.is_action_pressed("spawn_ball"):
		spawn_new_ball()
		
func _input(event):
	if Input.is_action_just_pressed("kill"):
		for object in world_objects:
			object.queue_free()
		world_objects = []
