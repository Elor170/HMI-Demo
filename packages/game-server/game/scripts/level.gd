extends Node3D

@onready var world_objects = []
@onready var seconds_counter = 0
@onready var timer = $Timer
			 
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
		
func get_world_data():
	var spheres = 0
	var cubes = 0
	for object in world_objects:
		if object is Ball:
			spheres += 1
		elif object is Cube:
			cubes += 1
			
	return {
		"cubes": cubes,
		"spheres": spheres,
		"fps": Engine.get_frames_per_second(),
		"date": Time.get_date_string_from_system(),
		"secondsPlayed": seconds_counter
	}

func record_logs():
	var data = get_world_data()
	const headers = ["Content-Type: application/json"]
	var body = JSON.stringify(data)
	var error = $HTTPRequest.request("/logs", headers, HTTPClient.METHOD_POST, body)
	if error != OK:
		push_error(" An error occured in  the HTTP request")


func _on_timer_timeout():
	seconds_counter += 1
	record_logs()
