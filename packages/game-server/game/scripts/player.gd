extends CharacterBody3D


const SPEED = 4
const JUMP_VELOCITY = 5
const PUSH_FORCE = 10 * SPEED
const MOVE_POWER = 4
const SENSITIVITY = .03
const RAY_LENGTH = 1000
const DEFAULT_HAND_POSITION = -4

@onready var neck := $Neck
@onready var camera := $Neck/Camera3D
@onready var hand := $Neck/Camera3D/hand
@onready var player := $Player
@onready var map := "res://scenes/Map.tscn"
@onready var capture_mouse = false

var picked_object: RigidBody3D

#func _ready():
	#Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
	#hand.position.z = DEFAULT_HAND_POSITION

func _unhandled_input(event):		
	if event is InputEventMouseMotion:
		neck.rotate_y(-event.relative.x * SENSITIVITY)
		camera.rotate_x(-event.relative.y * SENSITIVITY)			
		camera.rotation.x = clamp(camera.rotation.x, deg_to_rad(-90), deg_to_rad(90))

# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/3d/default_gravity")

func logs_record_manager():
	if Input.is_action_just_pressed("rec_timestamp_increase"):
		Globals.increase_rec_time()
	elif Input.is_action_just_pressed("rec_timestamp_decrease"):
		Globals.decrease_rec_time()
		
		

func _input(event):
	logs_record_manager()
	
	if Input.is_action_just_pressed("record_toggle"):
		Globals.is_recording = !Globals.is_recording
	
	if event is InputEventMouseButton:
		if not capture_mouse:
			Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
			capture_mouse = true
	
	if Input.is_action_just_pressed("action"):
		pick_up_object()
	
	if Input.is_action_just_released("action"):
		remove_object()
		
	if picked_object == null:
		return
		
	if Input.is_action_just_pressed("move_object_closer"):
		if hand.position.z < -2:
			hand.position.z += .4
		
	elif Input.is_action_just_pressed("move_object_away"):
		if hand.position.z > -10:
			hand.position.z -= .4
			
	
	if Input.is_action_just_pressed("rotate_left"):
		picked_object.rotate_x(.4)
		
	elif Input.is_action_just_pressed("rotate_right"):
		picked_object.rotate_x(.4)
		
	if Input.is_action_just_pressed("kill_specific"):
		picked_object.queue_free()
		picked_object = null
	
	if Input.is_action_pressed("inlarge"):
		var x = picked_object.scale.x * 1.1
		var y = picked_object.scale.y * 1.1
		var z = picked_object.scale.z * 1.1
		
		var new_scale = Vector3(x, y, z)
		print(new_scale)
		picked_object.transform.scaled(new_scale)
func _physics_process(delta):
	if move_and_slide():
		for i in get_slide_collision_count():
			var col = get_slide_collision(i)
			if col.get_collider() is RigidBody3D:
				col.get_collider().apply_force(col.get_normal() * -PUSH_FORCE)
	
	# Add the gravity.
	if not is_on_floor(): 
		velocity.y -= gravity * delta

	# Handle jump.
	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
		velocity.y = JUMP_VELOCITY

	# Get the input direction and handle the movement/deceleration.
	# As good practice, you should replace UI actions with custom gameplay actions.
	var current_speed = SPEED
	
	if Input.is_action_pressed('sprint'):
		current_speed *= 2
		
	var input_dir = Input.get_vector("move_left", "move_right", "move_forward", "move_backwards")
	var direction = (neck.transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()
	if direction:
		velocity.x = direction.x * current_speed
		velocity.z = direction.z * current_speed
	else:
		velocity.x = 0
		velocity.z = 0
		
	if picked_object != null and picked_object:
		var a = picked_object.global_transform.origin
		var b = hand.global_transform.origin
		
		picked_object.set_linear_velocity((b - a) * MOVE_POWER)

	move_and_slide()
	 
func pick_up_object():
	var space_state = get_world_3d().direct_space_state
	var mousepos = get_viewport().get_mouse_position()
	
	var origin = camera.project_ray_origin(mousepos)
	var end = origin + camera.project_ray_normal(mousepos) * RAY_LENGTH
	var query = PhysicsRayQueryParameters3D.create(origin, end)
	
	query.collide_with_areas = true
	
	var result = space_state.intersect_ray(query)
	if result.size() > 0:
		var collider = result["collider"]
		if collider != null and collider is RigidBody3D and collider.is_in_group('Dragable'):
			picked_object = collider

func remove_object():
	hand.position.z = DEFAULT_HAND_POSITION
	if picked_object != null:
		picked_object = null
