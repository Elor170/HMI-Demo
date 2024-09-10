extends Node3D

@onready var world_objects = []
@onready var _menu := $Menu
@onready var _http := $HTTPRequest

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
	if Input.is_action_just_pressed("menu"):
		Global.is_menu_visible = not Global.is_menu_visible
		_menu.visible = Global.is_menu_visible
	
	elif Input.is_action_just_pressed("kill"):
		for object in world_objects:
			object.queue_free()
		world_objects = []

func record_data_logs():
	var fps = Engine.get_frames_per_second()
	var balls_counter = 0
	var cubes_counter = 0
	
	for element in world_objects:
		if element is Cube:
			cubes_counter = cubes_counter + 1
		else:
			cubes_counter = cubes_counter + 1
	
	print(OS.get_environment("SERVER_IP") + ":" + OS.get_environment("GAME_BACKEND_SERVER_PORT"))
	var body := {"fps": fps, "cubes": cubes_counter, "spheres": balls_counter}
	_http.request("http://localhost:3006/add-log", ["Content-Type: application/json"], HTTPClient.METHOD_POST, JSON.stringify(body))

func _on_logs_timer_timeout() -> void:
	record_data_logs()
